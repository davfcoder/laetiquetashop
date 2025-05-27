const pantalla = document.querySelector(".pantalla");
const botones = document.querySelectorAll(".btn");
const btnCalculadora = document.querySelector(".btn-calculadora");
const mostrarCalculadora = document.querySelector(".calculadora");

document.addEventListener('DOMContentLoaded', () => {
    btnCalculadora.addEventListener("click", () => {
      const isVisible = mostrarCalculadora.classList.contains("visible"); // Verifica si el chatbot está visible
  
      if (isVisible) { // Si la calculadora está visible
        mostrarCalculadora.classList.remove("visible"); // Remueve la clase visible
        mostrarCalculadora.style.display = "none"; // Oculta el chatbot
      } else {
        mostrarCalculadora.classList.add("visible"); // Agrega la clase visible
        mostrarCalculadora.style.display = "grid"; // Muestra el chatbot
      }
    });
  });

botones.forEach(boton => {
    boton.addEventListener("click", () => {
        const botonApretado = boton.textContent;

        if (boton.id === "c") {
            pantalla.textContent = "0";
            return;
        }

        if (boton.id === "borrar") {
            if (pantalla.textContent.length === 1 || pantalla.textContent === "Error!") {
                pantalla.textContent = "0";
            } else {
                pantalla.textContent = pantalla.textContent.slice(0, -1);
            }
            return;
        }

        if (boton.id === "igual") {
            try {
                pantalla.textContent = eval(pantalla.textContent);
            } catch {
                pantalla.textContent = "Error!";
            }
            return;
        }

        if (pantalla.textContent === "0" || pantalla.textContent === "Error!") {
            pantalla.textContent = botonApretado;
        } else {
            pantalla.textContent += botonApretado;
        }
    })
})