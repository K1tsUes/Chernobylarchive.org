// 1. Inicializar el mapa centrado en Prípiat (Latitud, Longitud) y nivel de zoom
const mapa = L.map('mapa').setView([51.4045, 30.0542], 14);

// 2. Cargar la capa de imágenes del mapa (OpenStreetMap)
L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
  maxZoom: 18,
  attribution: 'Tiles &copy; Esri'
}).addTo(mapa);

const radiationlevel = {
    LOW: {color: '#2ecc71', label: 'Low'},
    MEDIUM: {color: '#f39c12', label: 'Medium'},
    HIGH: {color: '#e74c3c', label: 'High'},
    EXTREME: {color: '#8e44ad', label: 'Extreme'}
}


// 3. FUNCIÓN REUTILIZABLE PARA AÑADIR MARCADORES CON IMAGEN Y TEXTO
function crearMarcador(lat, lng, titulo, descripcion, urlImagen, coordsTexto, nivel) {
    // Usamos L.circleMarker en lugar del icono clásico para poder pintarlo del color del nivel
    const marcador = L.circleMarker([lat, lng], {
        radius: 9,
        fillColor: nivel.color,
        color: "#ffffff",
        weight: 2,
        opacity: 1,
        fillOpacity: 0.9
    }).addTo(mapa);

    const popupHTML = `
        <h4>${titulo}</h4>
        <div style="margin-bottom: 8px;">
            <span style="display:inline-block; padding: 2px 6px; background-color: ${nivel.color}; color: #ffffff; font-size: 0.75em; border-radius: 3px; font-weight: bold;">
                Radiation level: ${nivel.label}
            </span>
        </div>
        ${urlImagen ? `<img src="${urlImagen}" alt="${titulo}" style="width: 100%; height: 120px; object-fit: cover; border-radius: 2px; margin-bottom: 8px; border: 1px solid #333333;">` : ''}
        <p>${descripcion}</p>
        <span class="coordinates">COORDS: ${coordsTexto}</span>
    `;

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
    "https://cdn.pixabay.com/photo/2020/03/04/11/46/chernobyl-4901445_1280.jpg", // Ruta de tu imagen
    "51.4082° N, 30.0558° E",
    radiationlevel.HIGH
);

// Ejemplo 2: Hotel Polissya (Con imagen)
crearMarcador(
    51.406888984689495, 
    30.058201646588643,  
    "Hotel Polissya", 
    "Located off Kurchatov Street in Pripyat's central square, Hotel Polissya was the city's primary hotel. Beyond housing visitors, it featured a popular restaurant that hosted major local events and private celebrations like weddings. Following the 1986 evacuation, the hotel was repurposed as a headquarters and observation post by Valery Legasov and Boris Shcherbina to monitor the power plant's status and oversee the initial liquidation efforts.", 
    "https://cdn.pixabay.com/photo/2016/05/01/22/51/pripyat-1366165_1280.jpg", 
    "51.406888984689495° N, 30.058201646588643° E",
    radiationlevel.LOW
);

// Ejemplo 3: Piscina Azure (Sin imagen, opcional)
crearMarcador(
    51.40685565253628, 
    30.049247654522823, 
    "Pool Azure(Lazurniy)", 
    "Located just past the intersection of Sergeant Lazarev Street and Sportyvna Street, the Avanhard Sports Complex housed Pripyat's primary swimming pool. Local residents gathered here to swim and socialize. Following the 1986 evacuation, the facility remained active and was used by liquidators and power plant personnel until 1998.", 
    "https://cdn.pixabay.com/photo/2018/09/29/12/04/chernobyl-3711304_1280.jpg", // Si dejas la comilla vacía, no muestra imagen
    "51.4085° N, 30.0505° E",
    radiationlevel.LOW
);

crearMarcador(
    51.406872,
    30.065845,
    "Hospital MSCh-126",
    "Located at Druzhby Narodiv Street near the intersection of Kurchatov Street, Ogneva Street, and Naberezhna Street. Hospital No. 126 was one of the most important medical facilities in Pripyat, featuring specialized maternity, pediatric, and surgical clinics. First aid was administered here to the plant crew and firefighters during the Chernobyl disaster; the firefighters' clothing remains in the basement of the hospital and is extremely radioactive (DO NOT TRY TO ACCESS). ",
    "https://cdn.pixabay.com/photo/2020/08/03/09/41/ruins-5459646_1280.jpg",
    "51.406872º N, 30.065845º E",
    radiationlevel.EXTREME
);

crearMarcador(
    51.406744138502276, 
    30.05656742201265,
    "Palace of Culture Energetik",
    "Located in Pripyat's central square, the Energetik Palace of Culture was the main hub for civic and cultural life. It hosted theatrical plays, concerts, sports events, and local Communist Party assemblies, prominently displaying propaganda banners for major events like the XXVII Congress of the CPSU.",
    "https://usercontent.one/wp/www.chernobyl.one/wp-content/uploads/2020/05/Palace-Culture-Energetik-01.jpg?media=1768479454",
    "51.406744138502276º N, 30.05656742201265º E",
    radiationlevel.LOW
);