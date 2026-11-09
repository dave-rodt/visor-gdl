// Puntos de referencia. alt = altura de la punta sobre el nivel del mar (m).
// Coordenadas: OpenStreetMap. Altura del suelo: Copernicus DEM (Open-Meteo).
// Edificios: alt = suelo + altura estimada del edificio, marcada "aprox".
// tipo: "m" = montaña, "e" = edificio o monumento.
export const LANDMARKS = [
  // Montañas
  { nombre: "Volcán de Tequila", lat: 20.787099, lon: -103.84681, alt: 2920, tipo: "m" },
  { nombre: "Cerro Viejo", lat: 20.364182, lon: -103.43592, alt: 2960, tipo: "m" },
  { nombre: "Nevado de Colima", lat: 19.56334, lon: -103.60829, alt: 4260, tipo: "m" }, // solo días muy despejados
  { nombre: "Volcán de Colima", lat: 19.512643, lon: -103.61693, alt: 3860, tipo: "m" }, // solo días muy despejados
  { nombre: "Cerro del Cuatro", lat: 20.599545, lon: -103.36312, alt: 1860, tipo: "m" },
  { nombre: "Cerro de la Reina", lat: 20.633547, lon: -103.23956, alt: 1707, tipo: "m" },
  { nombre: "Cerro El Tajo", lat: 20.595401, lon: -103.47491, alt: 2051, tipo: "m" },
  { nombre: "Cerro El Chapulín", lat: 20.67732, lon: -103.48647, alt: 2024, tipo: "m" },
  { nombre: "Cerro La Col", lat: 20.867985, lon: -103.50771, alt: 2200, tipo: "m" },

  // Edificios y monumentos
  { nombre: "Catedral", lat: 20.677133, lon: -103.34696, alt: 1551 + 65, tipo: "e" },
  { nombre: "Templo Expiatorio", lat: 20.673657, lon: -103.35885, alt: 1558 + 75, tipo: "e" }, // aprox
  { nombre: "Templo La Luz del Mundo", lat: 20.671891, lon: -103.28411, alt: 1570 + 60, tipo: "e" }, // aprox
  { nombre: "Basílica de Zapopan", lat: 20.721328, lon: -103.39234, alt: 1581 + 40, tipo: "e" }, // aprox
  { nombre: "Hotel Riu", lat: 20.665815, lon: -103.39372, alt: 1604 + 200, tipo: "e" }, // aprox
  { nombre: "Puente Matute Remus", lat: 20.664851, lon: -103.39376, alt: 1602 + 100, tipo: "e" }, // aprox, punta del mástil
  { nombre: "La Minerva", lat: 20.674405, lon: -103.38733, alt: 1590 + 21, tipo: "e" },
  { nombre: "Los Arcos", lat: 20.674436, lon: -103.38482, alt: 1588 + 20, tipo: "e" }, // aprox
  { nombre: "Hospicio Cabañas", lat: 20.67687, lon: -103.3377, alt: 1540 + 35, tipo: "e" }, // aprox
  { nombre: "Punto São Paulo", lat: 20.702109, lon: -103.37645, alt: 1549 + 170, tipo: "e" }, // aprox
  { nombre: "Andares", lat: 20.710635, lon: -103.41286, alt: 1582 + 40, tipo: "e" }, // aprox
  { nombre: "Estadio Jalisco", lat: 20.704786, lon: -103.32767, alt: 1565 + 30, tipo: "e" }, // aprox
  { nombre: "Estadio Akron", lat: 20.681846, lon: -103.46267, alt: 1675 + 45, tipo: "e" }, // aprox
  { nombre: "Auditorio Telmex", lat: 20.733308, lon: -103.38135, alt: 1558 + 35, tipo: "e" }, // aprox
  { nombre: "Aeropuerto GDL", lat: 20.528724, lon: -103.31353, alt: 1526 + 30, tipo: "e" }, // aprox
];
