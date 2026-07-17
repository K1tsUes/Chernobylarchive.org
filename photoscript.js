document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("image-modal");
    const modalImg = document.getElementById("modal-img");
    const modalCaption = document.getElementById("modalcaption");
    const closeBtn = document.querySelector(".modal-close");

    // Selecciona todas las imágenes de tus tarjetas
    const galeryImg = document.querySelectorAll(".photogalery-item img");

    galeryImg.forEach(img => {
        img.addEventListener("click", () => {
            if (modal) modal.style.display = "flex";
            if (modalImg) modalImg.src = img.src;
            
            // Captura el texto descriptivo del figcaption
            const captionText = img.nextElementSibling ? img.nextElementSibling.firstChild.textContent.trim() : "";
            if (modalCaption) modalCaption.innerText = captionText;
        });
    });

    // Cerrar al clicar en la X
    if (closeBtn) {
        closeBtn.addEventListener("click", () => {
            modal.style.display = "none";
        });
    }

    // Cerrar al clicar en el fondo oscuro fuera de la imagen
    if (modal) {
        modal.addEventListener("click", (e) => {
            if (e.target === modal || e.target === closeBtn) {
                modal.style.display = "none";
            }
        });
    }
});