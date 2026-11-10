"""Download Spanish Wikipedia text and Wikimedia Commons photos for each landmark,
plus the English article text where one exists (texto_en, url_en).

Writes info/info.json and info/img/*.jpg so the app opens details instantly and offline.
Run from the repo root:  python3 -I tools/fetch_info.py
Slow on purpose: Wikimedia rate-limits fast clients.
"""
import json, re, subprocess, time, unicodedata, urllib.error, urllib.parse, urllib.request
from html import unescape
from pathlib import Path

UA = "visor-gdl/0.2 (https://github.com/dave-rodt/visor-gdl)"
PHOTOS = 3
WIDTH = 960  # a standard Wikimedia thumbnail width
ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "info"
IMG = OUT / "img"
SKIP = re.compile(r"map|mapa|locat|locali|relief|relieve|plano|logo|escudo|cartel|letrero|perros|diagram|ubicac|invasoras|\.png$", re.I)


def get(url, raw=False):
    for wait in (0, 20, 60, 120):
        time.sleep(wait or 2.5)
        try:
            with urllib.request.urlopen(urllib.request.Request(url, headers={"User-Agent": UA}), timeout=60) as r:
                data = r.read()
                return data if raw else json.loads(data)
        except urllib.error.HTTPError as e:
            if e.code == 404:
                return None
            if e.code != 429 and e.code < 500:
                raise
            print("  retry", e.code, flush=True)
        except (urllib.error.URLError, ConnectionError, TimeoutError) as e:  # dropped connection: try again
            print("  retry", e, flush=True)
    raise RuntimeError("gave up on " + url)


def slug(s):
    s = unicodedata.normalize("NFKD", s).encode("ascii", "ignore").decode().lower()
    return re.sub(r"[^a-z0-9]+", "-", s).strip("-")


def strip_html(s):
    return re.sub(r"\s+", " ", unescape(re.sub(r"<[^>]+>", "", s or ""))).strip()


def photo(file_title, base):
    """Download one Commons file as a JPEG thumbnail. Returns its credit entry, or None."""
    q = urllib.parse.urlencode({"action": "query", "titles": file_title, "prop": "imageinfo", "iiprop": "url|extmetadata|mime",
                                "iiurlwidth": WIDTH, "format": "json"})
    pages = get("https://commons.wikimedia.org/w/api.php?" + q)["query"]["pages"]
    ii = next(iter(pages.values())).get("imageinfo", [None])[0]
    if not ii or ii.get("mime") not in ("image/jpeg", "image/png", "image/webp"):
        return None
    meta = ii.get("extmetadata", {})
    dest = IMG / f"{base}.jpg"
    tmp = IMG / f"{base}.tmp"
    tmp.write_bytes(get(ii["thumburl"], raw=True))
    # Resize to at most WIDTH px and recompress as JPEG (sips ships with macOS).
    subprocess.run(["sips", "-s", "format", "jpeg", "-s", "formatOptions", "72", "-Z", str(WIDTH), str(tmp), "--out", str(dest)],
                   check=True, capture_output=True)
    tmp.unlink()
    return {
        "src": f"info/img/{dest.name}",
        "autor": strip_html(meta.get("Artist", {}).get("value", "")) or "Desconocido",
        "licencia": strip_html(meta.get("LicenseShortName", {}).get("value", "")),
        "fuente": ii["descriptionurl"],
    }


def english(wiki):
    """English summary of the article linked from the Spanish one, or None if there is none."""
    q = urllib.parse.urlencode({"action": "query", "titles": wiki, "prop": "langlinks", "lllang": "en", "redirects": 1, "format": "json"})
    page = next(iter(get("https://es.wikipedia.org/w/api.php?" + q)["query"]["pages"].values()))
    links = page.get("langlinks")
    if not links:
        return None
    s = get("https://en.wikipedia.org/api/rest_v1/page/summary/" + urllib.parse.quote(links[0]["*"].replace(" ", "_")))
    return s and {"texto_en": s.get("extract", ""), "url_en": s["content_urls"]["mobile"]["page"]}


def main():
    IMG.mkdir(parents=True, exist_ok=True)
    src = (ROOT / "landmarks.js").read_text()
    places = [(n, w1 or w2) for n, w1, w2 in
              re.findall(r'''nombre: "([^"]+)"[^\n]*?(?:wiki: (?:"([^"]+)"|'([^']+)'))?\s*}''', src)]
    out = json.loads((OUT / "info.json").read_text()) if (OUT / "info.json").exists() else {}
    for nombre, wiki in places:
        if not wiki:
            continue
        if nombre in out:
            if "url_en" not in out[nombre] and not out[nombre].get("sin_en"):
                print(nombre, "-> en", flush=True)
                out[nombre].update(english(wiki) or {"sin_en": True})
                (OUT / "info.json").write_text(json.dumps(out, ensure_ascii=False, indent=1))
            continue
        print(nombre, "->", wiki, flush=True)
        t = urllib.parse.quote(wiki.replace(" ", "_"))
        s = get(f"https://es.wikipedia.org/api/rest_v1/page/summary/{t}")
        m = get(f"https://es.wikipedia.org/api/rest_v1/page/media-list/{t}") or {"items": []}
        if not s:
            print("  no article", flush=True)
            continue
        files = [i["title"] for i in m["items"] if i.get("type") == "image" and i.get("showInGallery")
                 and re.search(r"\.(jpe?g|png|webp)$", i["title"], re.I)]
        # Skip maps, logos, plans and signs: we want photos of the place itself.
        files = [f for f in files if not SKIP.search(f)]
        fotos = []
        for f in files:
            if len(fotos) == PHOTOS:
                break
            title = re.sub(r"^(Archivo|File):", "File:", f)
            try:
                p = photo(title, f"{slug(nombre)}-{len(fotos) + 1}")
            except Exception as e:  # one bad file should not stop the run
                print("  skip", f, e, flush=True)
                p = None
            if p:
                print("  ", title, flush=True)
                fotos.append(p)
        out[nombre] = {"texto": s.get("extract", ""), "url": s["content_urls"]["mobile"]["page"], "fotos": fotos, **(english(wiki) or {"sin_en": True})}
        (OUT / "info.json").write_text(json.dumps(out, ensure_ascii=False, indent=1))
        print(f"  ok, {len(fotos)} fotos", flush=True)


if __name__ == "__main__":
    main()
