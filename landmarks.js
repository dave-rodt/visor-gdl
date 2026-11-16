// Puntos de referencia.
// alt    = altura de la punta sobre el nivel del mar (m). En zonas, altura del suelo.
// h, w   = alto y ancho del edificio (m), para dibujar su silueta. Estimados, marcados "aprox".
// perfil = forma de la silueta (ver PERFILES abajo).
// wiki   = título del artículo en es.wikipedia.org; tools/fetch_info.py baja su texto y fotos.
// tipo: "m" = montaña (su silueta sale del relieve), "e" = edificio o monumento,
//       "z" = zona o ciudad (sin silueta; si no se ve, la etiqueta se pone sobre el horizonte).
// Coordenadas y anchos: OpenStreetMap. Altura del suelo: Copernicus DEM. Alturas con fuente: Wikipedia.
export const LANDMARKS = [
  // Montañas
  { nombre: "Volcán de Tequila", lat: 20.787099, lon: -103.84681, alt: 2920, tipo: "m", wiki: "Volcán de Tequila" },
  { nombre: "Cerro Viejo", lat: 20.364182, lon: -103.43592, alt: 2960, tipo: "m", wiki: "Cerro Viejo (Jalisco)" },
  { nombre: "Nevado de Colima", lat: 19.56334, lon: -103.60829, alt: 4260, tipo: "m", wiki: "Nevado de Colima" },
  { nombre: "Volcán de Colima", lat: 19.512643, lon: -103.61693, alt: 3860, tipo: "m", wiki: "Volcán de Colima" },
  { nombre: "Cerro del Cuatro", lat: 20.599545, lon: -103.36312, alt: 1860, tipo: "m", wiki: "Cerro del Cuatro" },
  { nombre: "Cerro de la Reina", lat: 20.633547, lon: -103.23956, alt: 1707, tipo: "m" },
  { nombre: "Cerro El Tajo", lat: 20.595401, lon: -103.47491, alt: 2051, tipo: "m", wiki: "Bosque de la Primavera" },
  { nombre: "Cerro El Chapulín", lat: 20.67732, lon: -103.48647, alt: 2024, tipo: "m", wiki: "Bosque de la Primavera" },
  { nombre: "Cerro La Col", lat: 20.867985, lon: -103.50771, alt: 2200, tipo: "m" },

  // Edificios y monumentos (alt = suelo + h)
  { nombre: "Catedral", lat: 20.677133, lon: -103.34696, alt: 1551 + 66, h: 66, w: 72, perfil: "catedral", tipo: "e", wiki: "Catedral metropolitana de Guadalajara" },
  { nombre: "Templo Expiatorio", lat: 20.673657, lon: -103.35885, alt: 1558 + 75, h: 75, w: 35, perfil: "expiatorio", tipo: "e", wiki: "Templo Expiatorio del Santísimo Sacramento" }, // aprox
  { nombre: "Templo La Luz del Mundo", lat: 20.671891, lon: -103.28411, alt: 1570 + 60, h: 60, w: 90, perfil: "piramide", tipo: "e", wiki: "Iglesia La Luz del Mundo" }, // aprox
  { nombre: "Basílica de Zapopan", lat: 20.721328, lon: -103.39234, alt: 1581 + 40, h: 40, w: 45, perfil: "basilica", tipo: "e", wiki: "Basílica de Zapopan" }, // aprox
  { nombre: "Hotel Riu", lat: 20.665815, lon: -103.39372, alt: 1604 + 204, h: 204, w: 40, perfil: "torreCorona", tipo: "e", wiki: "Hotel Riu Plaza Guadalajara" }, // 204 m (Wikipedia)
  { nombre: "Puente Matute Remus", lat: 20.664851, lon: -103.39376, alt: 1602 + 40, h: 40, w: 165, perfil: "atirantado", tipo: "e", wiki: "Puente Matute Remus" }, // pilón 40 m, vano 165 m (Wikipedia)
  { nombre: "La Minerva", lat: 20.674405, lon: -103.38733, alt: 1590 + 21, h: 21, w: 10, perfil: "estatua", tipo: "e", wiki: "Glorieta La Minerva" },
  { nombre: "Los Arcos", lat: 20.674436, lon: -103.38482, alt: 1588 + 20, h: 20, w: 25, perfil: "arco", tipo: "e", wiki: "Arcos de Guadalajara" }, // aprox
  { nombre: "Hospicio Cabañas", lat: 20.67687, lon: -103.3377, alt: 1540 + 35, h: 35, w: 165, perfil: "cupula", tipo: "e", wiki: "Hospicio Cabañas" }, // aprox
  { nombre: "Fiesta Americana", lat: 20.673643, lon: -103.388991, alt: 1590 + 80, h: 80, w: 45, perfil: "torre", tipo: "e" }, // aprox: 22 pisos (Posadas), junto a La Minerva
  { nombre: "Punto São Paulo", lat: 20.70302, lon: -103.37571, alt: 1549 + 103, h: 103, w: 40, perfil: "torre", tipo: "e" }, // 103 m (skyscraperpage, Américas 1501)
  { nombre: "Classiqa Chapalita", lat: 20.65891, lon: -103.431653, alt: 1649 + 69, h: 69, w: 35, perfil: "torre", tipo: "e" }, // 69 m, 17 niveles (portafolio ADC 2026); ancho aprox; pin de Google Maps
  { nombre: "Andares", lat: 20.71139, lon: -103.41297, alt: 1582 + 40, h: 40, w: 150, perfil: "bloque", tipo: "e" }, // aprox
  { nombre: "Biblioteca Juan José Arreola", lat: 20.73809, lon: -103.38105, alt: 1559 + 35, h: 35, w: 130, perfil: "bloque", tipo: "e", wiki: 'Biblioteca Pública del Estado de Jalisco "Juan José Arreola"' }, // aprox
  { nombre: "Estadio Jalisco", lat: 20.704786, lon: -103.32767, alt: 1565 + 30, h: 30, w: 250, perfil: "estadio", tipo: "e", wiki: "Estadio Jalisco" }, // aprox
  { nombre: "Estadio Akron", lat: 20.681846, lon: -103.46267, alt: 1675 + 45, h: 45, w: 260, perfil: "estadio", tipo: "e", wiki: "Estadio Akron" }, // aprox
  { nombre: "Auditorio Telmex", lat: 20.733308, lon: -103.38135, alt: 1558 + 35, h: 35, w: 150, perfil: "boveda", tipo: "e", wiki: "Auditorio Telmex" }, // aprox
  { nombre: "Aeropuerto GDL", lat: 20.528724, lon: -103.31353, alt: 1526 + 30, h: 30, w: 20, perfil: "torreControl", tipo: "e", wiki: "Aeropuerto Internacional de Guadalajara" }, // aprox, torre de control

  // Zonas y ciudades
  { nombre: "Valle Real", lat: 20.724104, lon: -103.45002, alt: 1620, tipo: "z" }, // centro del fraccionamiento (OSM); suelo aprox
  { nombre: "Bosque de la Primavera", lat: 20.66, lon: -103.57, alt: 1750, tipo: "z", wiki: "Bosque de la Primavera" }, // centro aprox del área protegida
  { nombre: "Tlaquepaque", lat: 20.639678, lon: -103.31183, alt: 1583, tipo: "z", wiki: "San Pedro Tlaquepaque" },
  { nombre: "Puerto Vallarta", lat: 20.610364, lon: -105.2351, alt: 0, tipo: "z", wiki: "Puerto Vallarta" },
  { nombre: "Mazatlán", lat: 23.2494, lon: -106.4111, alt: 0, tipo: "z", wiki: "Mazatlán" },
  { nombre: "Cancún", lat: 21.1619, lon: -86.8515, alt: 0, tipo: "z", wiki: "Cancún" },
  { nombre: "Ciudad de México", lat: 19.4326, lon: -99.1332, alt: 2240, tipo: "z", wiki: "Ciudad de México" },
];

// Modo pádel (secreto: mantén "Buscar" 5 s). Solo nombre y posición; la altura sale del relieve.
// Fuente: ubicaciones de Google Maps (vía padeldir.com) y Playtomic, revisadas nov 2026. Sin clubes privados ni cerrados.
export const PADEL = [
  { nombre: "60s Padel Club", lat: 20.73718, lon: -103.43252 },
  { nombre: "88 Elite Padel Club", lat: 20.62340, lon: -103.46670 },
  { nombre: "Alebrije 741 Padel Club", lat: 20.70643, lon: -103.40441 },
  { nombre: "All Seasons Padel Club", lat: 20.74898, lon: -103.38515 },
  { nombre: "Altium Sports Complex", lat: 20.69926, lon: -103.45581 },
  { nombre: "Balam Indoor Padel", lat: 20.64607, lon: -103.43308 },
  { nombre: "Best Padel", lat: 20.61624, lon: -103.42675 },
  { nombre: "Bounce Padel", lat: 20.70889, lon: -103.38843 },
  { nombre: "Carbono Pádel Andares", lat: 20.70625, lon: -103.41591 },
  { nombre: "Complejo de Pádel AGA", lat: 20.67311, lon: -103.44998 },
  { nombre: "Draft Padel Americas", lat: 20.68760, lon: -103.37463 },
  { nombre: "Faro Pádel Club", lat: 20.64355, lon: -103.39044 },
  { nombre: "Goat Padel & Social Club", lat: 20.71108, lon: -103.44408 },
  { nombre: "JC Padel Club", lat: 20.73647, lon: -103.42690 },
  { nombre: "La Red Club de Padel", lat: 20.71132, lon: -103.44887 },
  { nombre: "La Reyna Padel Club", lat: 20.63349, lon: -103.30287 },
  { nombre: "Marava Club de Padel", lat: 20.54647, lon: -103.47357 },
  { nombre: "Padel & Beer", lat: 20.66317, lon: -103.41943 },
  { nombre: "Padel & Pickle Bugambilias", lat: 20.59954, lon: -103.43926 },
  { nombre: "Padel Club GDL", lat: 20.73258, lon: -103.37610 },
  { nombre: "Padel Factory GDL", lat: 20.69312, lon: -103.45207 },
  { nombre: "Padel Family GDL", lat: 20.68826, lon: -103.42775 },
  { nombre: "Padel Independencia", lat: 20.69620, lon: -103.33339 },
  { nombre: "Pádel Line GDL", lat: 20.66269, lon: -103.42911 },
  { nombre: "Padel One by Adidas", lat: 20.73566, lon: -103.43349 },
  { nombre: "Padel Ranch", lat: 20.76713, lon: -103.39576 },
  { nombre: "Pádel Santa Anita", lat: 20.55615, lon: -103.45621 },
  { nombre: "Padel Sport Guadalupe", lat: 20.65909, lon: -103.43266 },
  { nombre: "Padel Sport Zona Real", lat: 20.73409, lon: -103.45087 },
  { nombre: "Padel Station 4", lat: 20.65158, lon: -103.30732 },
  { nombre: "Padel Time", lat: 20.54176, lon: -103.44589 },
  { nombre: "Padel World Club", lat: 20.70779, lon: -103.45849 },
  { nombre: "Play It Club de Pádel", lat: 20.65584, lon: -103.31826 },
  { nombre: "Providencia Padel Club", lat: 20.68660, lon: -103.39370 },
  { nombre: "Puntaco Padel Club", lat: 20.58201, lon: -103.44084 },
  { nombre: "Pyramid Padel", lat: 20.63010, lon: -103.44152 },
  { nombre: "Real Padel Indoor Club", lat: 20.73800, lon: -103.43102 },
  { nombre: "Revo Pádel Providencia", lat: 20.69703, lon: -103.39213 },
  { nombre: "Sector Padel Club", lat: 20.61719, lon: -103.48437 },
  { nombre: "Smash Padel Club", lat: 20.68444, lon: -103.45256 },
  { nombre: "South Side Club Pádel", lat: 20.59943, lon: -103.42993 },
  { nombre: "Spider Padel", lat: 20.70723, lon: -103.41302 },
  { nombre: "Stanley Padel Solares", lat: 20.72047, lon: -103.46020 },
  { nombre: "Urban Padel Life", lat: 20.66004, lon: -103.39881 },
  { nombre: "Vibora Padel Club", lat: 20.70864, lon: -103.47091 },
  { nombre: "Warehouse Padel Club", lat: 20.72203, lon: -103.43586 },
  { nombre: "Wolf Padel Club", lat: 20.71299, lon: -103.33477 },
  { nombre: "X3 Padel Club", lat: 20.67784, lon: -103.44861 },
  { nombre: "Zander Padel Club", lat: 20.67390, lon: -103.40367 },
];

// Torres solo para la calibración por horizonte: su silueta se suma al horizonte esperado; no se dibujan ni salen en la lista.
// Sin nombres a propósito: nunca se muestran.
// Fuente: OpenStreetMap (height, o building:levels × 3.2 m); alturas corregidas con el portafolio ADC 2026 donde coincide. w = lado mayor de la caja del contorno, aprox.
// La altura del suelo sale del relieve al calcular.
export const TORRES = [
  { lat: 20.712814, lon: -103.412237, h: 173, w: 51 },
  { lat: 20.69425, lon: -103.375203, h: 147, w: 65 },
  { lat: 20.707689, lon: -103.413371, h: 144, w: 52 },
  { lat: 20.706507, lon: -103.414119, h: 134, w: 39 },
  { lat: 20.709481, lon: -103.415723, h: 116, w: 32 },
  { lat: 20.707684, lon: -103.412724, h: 100, w: 63 },
  { lat: 20.707033, lon: -103.413841, h: 99, w: 41 },
  { lat: 20.708086, lon: -103.414114, h: 93, w: 73 },
  { lat: 20.698037, lon: -103.372927, h: 143, w: 99 },
  { lat: 20.664737, lon: -103.349687, h: 90, w: 62 },
  { lat: 20.721854, lon: -103.427123, h: 84, w: 25 },
  { lat: 20.721552, lon: -103.427263, h: 84, w: 30 },
  { lat: 20.69486, lon: -103.373549, h: 83, w: 23 },
  { lat: 20.67647, lon: -103.413697, h: 83, w: 45 },
  { lat: 20.723185, lon: -103.434912, h: 80, w: 32 },
  { lat: 20.722264, lon: -103.426611, h: 80, w: 26 },
  { lat: 20.722187, lon: -103.427403, h: 80, w: 46 },
  { lat: 20.721886, lon: -103.426472, h: 80, w: 29 },
  { lat: 20.721507, lon: -103.42653, h: 80, w: 27 },
  { lat: 20.698829, lon: -103.373094, h: 80, w: 36 },
  { lat: 20.72114, lon: -103.426393, h: 77, w: 24 },
  { lat: 20.639921, lon: -103.409188, h: 87, w: 44 },
  { lat: 20.640113, lon: -103.409539, h: 87, w: 45 },
  { lat: 20.663604, lon: -103.349814, h: 72, w: 42 },
  { lat: 20.723068, lon: -103.418169, h: 70, w: 112 },
  { lat: 20.698248, lon: -103.373514, h: 122, w: 56 },
  { lat: 20.667838, lon: -103.368815, h: 66, w: 36 },
  { lat: 20.689676, lon: -103.474831, h: 64, w: 59 },
  { lat: 20.67609, lon: -103.413443, h: 64, w: 49 },
  { lat: 20.701108, lon: -103.372813, h: 64, w: 37 },
  { lat: 20.70027, lon: -103.373664, h: 64, w: 40 },
  { lat: 20.698809, lon: -103.372372, h: 64, w: 25 },
  { lat: 20.721724, lon: -103.429256, h: 60, w: 63 },
  // Portafolio ADC 2026: alturas oficiales; posición de Google Maps, OSM o skyscraperpage.
  { lat: 20.70143, lon: -103.37515, h: 130, w: 35 },
  { lat: 20.69851, lon: -103.3727, h: 105, w: 35 },
  { lat: 20.69746, lon: -103.37257, h: 105, w: 40 },
  { lat: 20.69768, lon: -103.36873, h: 87, w: 35 },
  { lat: 20.70225, lon: -103.37639, h: 86, w: 35 },
  { lat: 20.65078, lon: -103.39841, h: 80, w: 35 },
  { lat: 20.67977, lon: -103.39141, h: 64, w: 35 },
  { lat: 20.69998, lon: -103.37562, h: 76, w: 35 },
  { lat: 20.57007, lon: -103.45511, h: 85, w: 35 },
  { lat: 20.70947, lon: -103.40971, h: 140, w: 40 },
];

// Siluetas vistas de frente. x de -0.5 a 0.5 (fracción del ancho), y de 0 (suelo) a 1 (punta).
// poly = contorno relleno; lines = trazos sueltos (tirantes).
export const PERFILES = {
  catedral: { poly: [[-0.5, 0], [-0.5, 0.6], [-0.44, 0.68], [-0.38, 1], [-0.32, 0.68], [-0.26, 0.6], [-0.26, 0.42], [-0.1, 0.42],
    [-0.07, 0.52], [0, 0.56], [0.07, 0.52], [0.1, 0.42], [0.26, 0.42], [0.26, 0.6], [0.32, 0.68], [0.38, 1], [0.44, 0.68], [0.5, 0.6], [0.5, 0]] },
  expiatorio: { poly: [[-0.5, 0], [-0.5, 0.35], [-0.15, 0.42], [-0.15, 0.7], [-0.08, 0.76], [0, 1], [0.08, 0.76], [0.15, 0.7], [0.15, 0.42], [0.5, 0.35], [0.5, 0]] },
  piramide: { poly: [[-0.5, 0], [-0.4, 0.2], [-0.28, 0.4], [-0.16, 0.6], [-0.05, 0.78], [0, 1], [0.05, 0.78], [0.16, 0.6], [0.28, 0.4], [0.4, 0.2], [0.5, 0]] },
  basilica: { poly: [[-0.5, 0], [-0.5, 0.85], [-0.42, 1], [-0.34, 0.85], [-0.34, 0.55], [-0.1, 0.55], [0, 0.68], [0.1, 0.55], [0.34, 0.55], [0.34, 0.85], [0.42, 1], [0.5, 0.85], [0.5, 0]] },
  torreCorona: { poly: [[-0.5, 0], [-0.5, 0.86], [-0.36, 0.9], [-0.36, 0.94], [-0.15, 0.97], [0, 1], [0.15, 0.97], [0.36, 0.94], [0.36, 0.9], [0.5, 0.86], [0.5, 0]] },
  torre: { poly: [[-0.5, 0], [-0.5, 0.95], [-0.3, 1], [0.5, 1], [0.5, 0]] },
  atirantado: {
    poly: [[-0.025, 0], [-0.025, 1], [0.025, 1], [0.025, 0]],
    lines: [[[-0.5, 0.2], [0.5, 0.2]], [[0, 0.97], [-0.5, 0.2]], [[0, 0.97], [0.5, 0.2]], [[0, 0.88], [-0.36, 0.2]],
      [[0, 0.88], [0.36, 0.2]], [[0, 0.79], [-0.22, 0.2]], [[0, 0.79], [0.22, 0.2]]],
  },
  estatua: { poly: [[-0.5, 0], [-0.5, 0.08], [-0.32, 0.1], [-0.32, 0.6], [-0.16, 0.64], [-0.14, 0.86], [-0.04, 1], [0.04, 0.95], [0.14, 0.86], [0.16, 0.64], [0.32, 0.6], [0.32, 0.1], [0.5, 0.08], [0.5, 0]] },
  arco: { poly: [[-0.5, 0], [-0.5, 1], [0.5, 1], [0.5, 0], [0.2, 0], [0.2, 0.5], [0.14, 0.62], [0, 0.68], [-0.14, 0.62], [-0.2, 0.5], [-0.2, 0]] },
  cupula: { poly: [[-0.5, 0], [-0.5, 0.42], [-0.08, 0.42], [-0.08, 0.55], [-0.06, 0.68], [-0.02, 0.76], [-0.01, 1], [0.01, 1], [0.02, 0.76], [0.06, 0.68], [0.08, 0.55], [0.08, 0.42], [0.5, 0.42], [0.5, 0]] },
  bloque: { poly: [[-0.5, 0], [-0.5, 0.75], [-0.3, 1], [0.5, 1], [0.5, 0]] },
  estadio: { poly: [[-0.5, 0], [-0.46, 0.75], [-0.36, 1], [0.36, 1], [0.46, 0.75], [0.5, 0]] },
  boveda: { poly: [[-0.5, 0], [-0.5, 0.5], [-0.38, 0.8], [-0.2, 0.96], [0, 1], [0.2, 0.96], [0.38, 0.8], [0.5, 0.5], [0.5, 0]] },
  torreControl: { poly: [[-0.15, 0], [-0.15, 0.74], [-0.42, 0.8], [-0.5, 0.9], [-0.3, 1], [0.3, 1], [0.5, 0.9], [0.42, 0.8], [0.15, 0.74], [0.15, 0]] },
};
