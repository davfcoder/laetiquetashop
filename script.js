
// Navbar fijo
const navbar = document.getElementById("navbar"); // Selecciona el navbar
const logo = document.getElementById("logo-secundario"); // Selecciona el logo secundario
const navbarOffset = navbar.offsetTop; // Guarda la posición original del navbar
const navbarHeight = navbar.offsetHeight;
const body = document.body; // O el contenedor principal

window.addEventListener("scroll", function () { // Agrega un evento de desplazamiento a la ventana
    if (window.scrollY >= navbarOffset) { // Si el desplazamiento es mayor o igual a la posición original del navbar
        navbar.classList.add("fixed-top", "shadow"); // Agrega las clases para fijar el navbar y sombra
        logo.classList.add("visible"); // Aparece suavemente
        body.style.paddingTop = `${navbarHeight}px`; // Agrega espacio
    } else {
        navbar.classList.remove("fixed-top", "shadow"); // Quita las clases para fijar el navbar y sombra
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

// Carrusel 
document.addEventListener("DOMContentLoaded", function () { 
// Espera a que el DOM se cargue completamente
    let carouselElement = document.getElementById("carousel"); // Obtiene el elemento del carrusel por su ID
    let carousel = new bootstrap.Carousel(carouselElement, { // Inicializa el carrusel de Bootstrap
        interval: 8000, // Cambio de diapositiva cada 8 segundos
        ride: "carousel" // Hace que el carrusel se mueva automáticamente
    }); // **Bootstrap aplicado aquí**

    let videos = document.querySelectorAll("video"); // Selecciona todos los elementos <video> en la página

    carouselElement.addEventListener("slide.bs.carousel", function (event) { // Detecta cuando cambia la diapositiva (Bootstrap)
        videos.forEach(video => video.pause()); // Pausa todos los videos
        let activeSlide = event.relatedTarget; // Obtiene la diapositiva que será mostrada
        let video = activeSlide.querySelector("video"); // Busca si hay un video en la nueva diapositiva
        if (video) {  
            video.currentTime = 0; // Reinicia el video al inicio
            video.play(); // Reproduce el video
        }
    });
});

// Seleccionar talla
const sizeContainers = document.querySelectorAll('.size'); // Selecciona todos los elementos con la clase 'size'

sizeContainers.forEach((sizeContainer) => {  // Recorre cada contenedor de tallas
    const sizeLetters = sizeContainer.querySelectorAll('.size-letter'); // Selecciona todas las opciones de tallas dentro del contenedor
    
    sizeLetters.forEach((sizeLetter) => {  // Recorre cada opción de talla
        sizeLetter.addEventListener('click', () => { // Agrega un evento de clic a cada opción de talla
            sizeLetters.forEach((otherSizeLetter) => { // Recorre todas las tallas dentro del mismo contenedor
                otherSizeLetter.classList.remove('selected'); // Remueve la clase 'selected' de todas las tallas
            });
            sizeLetter.classList.add('selected'); // Agrega la clase 'selected' a la talla seleccionada
        });
    });
});


// Interacción contacto con whatsapp
document.getElementById("btn-contacto").addEventListener("click", function(event) {
    event.preventDefault(); // Evita que el enlace se abra

    let element = document.getElementById("zoomTarget-whatsapp"); // Selecciona el elemento al que se le hará zoom

    element.classList.add("zoom"); // Agrega el efecto de zoom

    setTimeout(() => { // Espera un poco antes de quitar zoom
        element.classList.remove("zoom"); // Quitar el efecto de zoom 
    }, 500); // Ajusta este tiempo de espera
});

// Interacción sección Aliados
document.getElementById("btn-aliados").addEventListener("click", function (event) { // Agrega un evento de clic al botón
    
    let element = document.getElementById("comercios-aliados");// Selecciona el elemento al que se le hará zoom

    // Desplazarse primero a la sección con un comportamiento suave
    element.scrollIntoView({ behavior: "smooth", block: "center" });

    // Esperar un poco a que termine el scroll antes de aplicar el zoom
    setTimeout(() => {
        element.classList.add("zoom");  // Agregar el efecto de zoom

        setTimeout(() => { // Esperar un poco antes de quitar zoom
            element.classList.remove("zoom"); // Quitar el efecto de zoom
        }, 650);
    }, 600); // Ajusta este tiempo si el desplazamiento es más lento o rápido
});