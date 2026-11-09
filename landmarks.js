// Puntos de referencia.
// alt  = altura de la punta sobre el nivel del mar (m).
// h, w = alto y ancho del edificio (m), para dibujar su contorno. Estimados, marcados "aprox".
// wiki = título del artículo en es.wikipedia.org (opcional).
// tipo: "m" = montaña (su silueta sale del relieve), "e" = edificio o monumento.
// Coordenadas: OpenStreetMap. Altura del suelo: Copernicus DEM.
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
  { nombre: "Catedral", lat: 20.677133, lon: -103.34696, alt: 1551 + 65, h: 65, w: 60, tipo: "e", wiki: "Catedral metropolitana de Guadalajara" },
  { nombre: "Templo Expiatorio", lat: 20.673657, lon: -103.35885, alt: 1558 + 75, h: 75, w: 35, tipo: "e", wiki: "Templo Expiatorio del Santísimo Sacramento" }, // aprox
  { nombre: "Templo La Luz del Mundo", lat: 20.671891, lon: -103.28411, alt: 1570 + 60, h: 60, w: 90, tipo: "e", wiki: "Iglesia La Luz del Mundo" }, // aprox
  { nombre: "Basílica de Zapopan", lat: 20.721328, lon: -103.39234, alt: 1581 + 40, h: 40, w: 45, tipo: "e", wiki: "Basílica de Zapopan" }, // aprox
  { nombre: "Hotel Riu", lat: 20.665815, lon: -103.39372, alt: 1604 + 200, h: 200, w: 40, tipo: "e", wiki: "Hotel Riu Plaza Guadalajara" }, // aprox
  { nombre: "Puente Matute Remus", lat: 20.664851, lon: -103.39376, alt: 1602 + 100, h: 100, w: 8, tipo: "e", wiki: "Puente Matute Remus" }, // aprox, mástil
  { nombre: "La Minerva", lat: 20.674405, lon: -103.38733, alt: 1590 + 21, h: 21, w: 8, tipo: "e", wiki: "Glorieta La Minerva" },
  { nombre: "Los Arcos", lat: 20.674436, lon: -103.38482, alt: 1588 + 20, h: 20, w: 25, tipo: "e", wiki: "Arcos de Guadalajara" }, // aprox
  { nombre: "Hospicio Cabañas", lat: 20.67687, lon: -103.3377, alt: 1540 + 35, h: 35, w: 165, tipo: "e", wiki: "Hospicio Cabañas" }, // aprox
  { nombre: "Punto São Paulo", lat: 20.702109, lon: -103.37645, alt: 1549 + 170, h: 170, w: 40, tipo: "e" }, // aprox
  { nombre: "Andares", lat: 20.710635, lon: -103.41286, alt: 1582 + 40, h: 40, w: 150, tipo: "e" }, // aprox
  { nombre: "Estadio Jalisco", lat: 20.704786, lon: -103.32767, alt: 1565 + 30, h: 30, w: 250, tipo: "e", wiki: "Estadio Jalisco" }, // aprox
  { nombre: "Estadio Akron", lat: 20.681846, lon: -103.46267, alt: 1675 + 45, h: 45, w: 260, tipo: "e", wiki: "Estadio Akron" }, // aprox
  { nombre: "Auditorio Telmex", lat: 20.733308, lon: -103.38135, alt: 1558 + 35, h: 35, w: 120, tipo: "e", wiki: "Auditorio Telmex" }, // aprox
  { nombre: "Aeropuerto GDL", lat: 20.528724, lon: -103.31353, alt: 1526 + 30, h: 30, w: 40, tipo: "e", wiki: "Aeropuerto Internacional de Guadalajara" }, // aprox, torre
];
