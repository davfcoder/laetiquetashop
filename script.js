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