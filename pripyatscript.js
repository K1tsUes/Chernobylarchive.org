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
    "This is Pripyat's famous Ferris wheel, which was never officially opened. Located in the amusement park just behind the Energetik Palace of Culture, it was scheduled to open on May 1st, 1986. However, five days before the planned grand opening, the worst nuclear accident in history occurred at the nearby power plant, leading to the permanent evacuation of the city.", 
    "https://cdn.pixabay.com/photo/2016/05/01/22/51/pripyat-1366165_1280.jpg", // Ruta de tu imagen
    "51.4082° N, 30.0558° E"
);

// Ejemplo 2: Hotel Polissya (Con imagen)
crearMarcador(
    51.406888984689495, 
    30.058201646588643,  
    "Hotel Polissya", 
    "Located off Kurchatov Street in Pripyat's central square, Hotel Polissya was the city's primary hotel. Beyond housing visitors, it featured a popular restaurant that hosted major local events and private celebrations like weddings. Following the 1986 evacuation, the hotel was repurposed as a headquarters and observation post by Valery Legasov and Boris Shcherbina to monitor the power plant's status and oversee the initial liquidation efforts.", 
    "img/hotel-polissya.jpg", 
    "51.406888984689495° N, 30.058201646588643° E"
);

// Ejemplo 3: Piscina Azure (Sin imagen, opcional)
crearMarcador(
    51.40685565253628, 
    30.049247654522823, 
    "Pool Azure(Lazurniy)", 
    "Located just past the intersection of Sergeant Lazarev Street and Sportyvna Street, the Avanhard Sports Complex housed Pripyat's primary swimming pool. Local residents gathered here to swim and socialize. Following the 1986 evacuation, the facility remained active and was used by liquidators and power plant personnel until 1998.", 
    "", // Si dejas la comilla vacía, no muestra imagen
    "51.4085° N, 30.0505° E"
);