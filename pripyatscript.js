// 1. Inicializar el mapa centrado en Prípiat (Latitud, Longitud) y nivel de zoom
const mapa = L.map('mapa').setView([51.4045, 30.0542], 14);

// 2. Cargar la capa de imágenes del mapa (OpenStreetMap)
L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
  maxZoom: 18,
  attribution: 'Tiles &copy; Esri'
}).addTo(mapa);


// 3. FUNCIÓN REUTILIZABLE PARA AÑADIR MARCADORES CON IMAGEN Y TEXTO
function crearMarcador(lat, lng, titulo, descripcion, urlImagen, coordsTexto) {
    // Crear el marcador en el mapa
    const marcador = L.marker([lat, lng]).addTo(mapa);

    // Construir el HTML interno del popup
    const popupHTML = `
        <h4>${titulo}</h4>
        ${urlImagen ? `<img src="${urlImagen}" alt="${titulo}" style="width: 100%; height: 120px; object-fit: cover; border-radius: 2px; margin-bottom: 8px; border: 1px solid #333333;">` : ''}
        <p>${descripcion}</p>
        <span class="coordinates">COORDS: ${coordsTexto}</span>
    `;

    // Vincular el HTML al popup del marcador
    marcador.bindPopup(popupHTML);

    return marcador;
}


// ==========================================
// AÑADIR PUNTOS DE INTERÉS (POI)
// ==========================================

// Ejemplo 1: Parque de Atracciones (Con imagen)
crearMarcador(
    51.4082, 
    30.0558, 
    "Parque de Atracciones", 
    "Famosa noria que nunca llegó a inaugurarse oficialmente debido al accidente.", 
    "img/ferris-wheel.jpg", // Ruta de tu imagen
    "51.4082° N, 30.0558° E"
);

// Ejemplo 2: Hotel Polissya (Con imagen)
crearMarcador(
    51.4067, 
    30.0556, 
    "Hotel Polissya", 
    "Uno de los edificios más altos de la ciudad, usado como puesto de observación.", 
    "img/hotel-polissya.jpg", 
    "51.4067° N, 30.0556° E"
);

// Ejemplo 3: Piscina Azure (Sin imagen, opcional)
crearMarcador(
    51.4085, 
    30.0505, 
    "Piscina Azure", 
    "Siguió en uso por los liquidadores hasta 1998.", 
    "", // Si dejas la comilla vacía, no muestra imagen
    "51.4085° N, 30.0505° E"
);