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
  { nombre: "Punto São Paulo", lat: 20.70302, lon: -103.37571, alt: 1549 + 170, h: 170, w: 40, perfil: "torre", tipo: "e" }, // aprox
  { nombre: "Andares", lat: 20.71139, lon: -103.41297, alt: 1582 + 40, h: 40, w: 150, perfil: "bloque", tipo: "e" }, // aprox
  { nombre: "Biblioteca Juan José Arreola", lat: 20.73809, lon: -103.38105, alt: 1559 + 35, h: 35, w: 130, perfil: "bloque", tipo: "e", wiki: 'Biblioteca Pública del Estado de Jalisco "Juan José Arreola"' }, // aprox
  { nombre: "Estadio Jalisco", lat: 20.704786, lon: -103.32767, alt: 1565 + 30, h: 30, w: 250, perfil: "estadio", tipo: "e", wiki: "Estadio Jalisco" }, // aprox
  { nombre: "Estadio Akron", lat: 20.681846, lon: -103.46267, alt: 1675 + 45, h: 45, w: 260, perfil: "estadio", tipo: "e", wiki: "Estadio Akron" }, // aprox
  { nombre: "Auditorio Telmex", lat: 20.733308, lon: -103.38135, alt: 1558 + 35, h: 35, w: 150, perfil: "boveda", tipo: "e", wiki: "Auditorio Telmex" }, // aprox
  { nombre: "Aeropuerto GDL", lat: 20.528724, lon: -103.31353, alt: 1526 + 30, h: 30, w: 20, perfil: "torreControl", tipo: "e", wiki: "Aeropuerto Internacional de Guadalajara" }, // aprox, torre de control

  // Zonas y ciudades
  { nombre: "Tlaquepaque", lat: 20.639678, lon: -103.31183, alt: 1583, tipo: "z", wiki: "San Pedro Tlaquepaque" },
  { nombre: "Puerto Vallarta", lat: 20.610364, lon: -105.2351, alt: 0, tipo: "z", wiki: "Puerto Vallarta" },
  { nombre: "Newport, Rhode Island", lat: 41.4901, lon: -71.3128, alt: 0, tipo: "z", wiki: "Newport (Rhode Island)" },
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
