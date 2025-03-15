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