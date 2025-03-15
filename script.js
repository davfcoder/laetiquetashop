// Seleccionamos el navbar
const navbar = document.getElementById("navbar");
const navbarOffset = navbar.offsetTop; // Guarda la posición original del navbar

window.addEventListener("scroll", function () {
    if (window.scrollY >= navbarOffset) {
        navbar.classList.add("fixed-top");
        navbar.classList.add("shadow");
    } else {
        navbar.classList.remove("fixed-top");
        navbar.classList.remove("shadow");
    }
});




// Aviso de Cookies
document.addEventListener("DOMContentLoaded", function () {
    const cookieBanner = document.getElementById("cookie-banner");
    const acceptCookies = document.getElementById("accept-cookies");

    // Verifica si el usuario ya aceptó las cookies
    if (!localStorage.getItem("cookiesAccepted")) {
        cookieBanner.style.display = "flex";
    }

    acceptCookies.addEventListener("click", function () {
        localStorage.setItem("cookiesAccepted", "true");
        cookieBanner.style.display = "none";
    });
});


// footer
document.getElementById("year").textContent = new Date().getFullYear();