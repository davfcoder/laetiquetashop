// Seleccionamos el navbar
const navbar = document.getElementById("navbar");
const logo = document.getElementById("logo-secundario");
const navbarOffset = navbar.offsetTop; // Guarda la posición original del navbar
const navbarHeight = navbar.offsetHeight;
const body = document.body; // O el contenedor principal

window.addEventListener("scroll", function () {
    if (window.scrollY >= navbarOffset) {
        navbar.classList.add("fixed-top", "shadow");
        logo.classList.add("visible"); // Aparece suavemente
        body.style.paddingTop = `${navbarHeight}px`; // Agrega espacio
    } else {
        navbar.classList.remove("fixed-top", "shadow");
        logo.classList.remove("visible"); // Aparece suavemente
        body.style.paddingTop = "0"; // Restaura el espacio
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


document.addEventListener("DOMContentLoaded", function () {
    let carouselElement = document.getElementById("carousel");
    let carousel = new bootstrap.Carousel(carouselElement, {
        interval: 8000, // Cambio de slide cada 8 segundos
        ride: "carousel"
    });

    let videos = document.querySelectorAll("video");

    // Escuchar cuando el slide cambia
    carouselElement.addEventListener("slide.bs.carousel", function (event) {
        videos.forEach(video => video.pause()); // Pausa todos los videos
        let activeSlide = event.relatedTarget; // Próxima diapositiva
        let video = activeSlide.querySelector("video");
        if (video) {
            video.currentTime = 0; // Reinicia el video
            video.play(); // Lo reproduce
        }
    });
});







