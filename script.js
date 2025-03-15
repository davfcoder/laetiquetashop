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


// Botón de Scroll Imagen secreta
document.addEventListener("DOMContentLoaded", function () {
    let fotoSecreta = document.querySelector(".foto_secreta");
    let timeout;

    window.addEventListener("scroll", function () {
        let scrollTop = window.scrollY || document.documentElement.scrollTop;
        let scrollHeight = document.documentElement.scrollHeight;
        let clientHeight = document.documentElement.clientHeight;

        if (scrollTop + clientHeight >= scrollHeight - 10) {
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                fotoSecreta.style.display = "block";
            }, 1000); // Se mostrará después de 1 segundo
        } else {
            clearTimeout(timeout);
            fotoSecreta.style.display = "none";
        }
    });
});




