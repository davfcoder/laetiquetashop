

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
    }, 660); // Ajusta este tiempo si el desplazamiento es más lento o rápido
});