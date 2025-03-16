// Seleccionamos el navbar
const navbar = document.getElementById("navbar");
const logo = document.getElementById("logo-secundario");
const navbarOffset = navbar.offsetTop; // Guarda la posición original del navbar

window.addEventListener("scroll", function () {
    if (window.scrollY >= navbarOffset) {
        navbar.classList.add("fixed-top", "shadow");
        logo.classList.add("visible"); // Aparece suavemente
    } else {
        navbar.classList.remove("fixed-top", "shadow");
        logo.classList.remove("visible"); // Aparece suavemente
    }
});


// Aviso de Cookies
document.addEventListener("DOMContentLoaded", function () {
    // Espera a que el DOM esté completamente cargado antes de ejecutar el código

    const cookieBanner = document.getElementById("cookie-banner"); // Obtiene el elemento del banner de cookies por su ID
    const acceptCookies = document.getElementById("accept-cookies"); // Obtiene el botón de aceptar cookies por su ID

    // Verifica si el usuario ya aceptó las cookies previamente
    if (!localStorage.getItem("cookiesAccepted")) { 
        cookieBanner.style.display = "flex"; // Muestra el banner si no se ha aceptado
    }

    // Agrega un evento de clic al botón de aceptar cookies
    acceptCookies.addEventListener("click", function () {
        localStorage.setItem("cookiesAccepted", "true"); // Guarda la aceptación de cookies en el almacenamiento local
        cookieBanner.style.display = "none"; // Oculta el banner después de aceptar
    });
});


// Asegurar que el carrusel inicie en la primera diapositiva
document.addEventListener("DOMContentLoaded", function () {
    // "DOMContentLoaded" se activa cuando el HTML ha sido completamente cargado y analizado, antes de que se carguen imágenes y hojas de estilo.
    // Esto garantiza que el script solo se ejecute cuando el DOM esté listo.
    
    let carousel = new bootstrap.Carousel(document.getElementById("videoCarousel"), {
        // Se crea una instancia del carrusel de Bootstrap.
        // "bootstrap.Carousel()" es una función de Bootstrap 5 que permite controlar programáticamente el carrusel.
                
        interval: 8000, // Cambia de video cada 8 segundos
        // "interval" define el tiempo en milisegundos entre cada cambio automático de diapositiva.
          
        ride: "carousel"
        // "indica que el carrusel comenzará automáticamente cuando se cargue la página.
        // Esta es una propiedad de Bootstrap 5 que permite iniciar la animación sin necesidad de interacción del usuario.
    });
});






