  const form = document.querySelector("form");
  const botonEnviar = document.getElementById("btn-enviar");
  const mensajeExito = document.getElementById("mensaje-exito");

  form.addEventListener("submit", function(event) {
    event.preventDefault(); // Evita el envío tradicional

    // Desactiva el botón y cambia el texto
    botonEnviar.disabled = true;
    botonEnviar.textContent = "Enviando...";

    // Simula envío con retraso (como si enviara al servidor)
    setTimeout(() => {
      mensajeExito.style.display = "block"; // Muestra mensaje
      botonEnviar.textContent = "Enviado ✔️";
      
      // Limpia el formulario después de enviar
      form.reset();

      // Opcional: vuelve a habilitar el botón después de unos segundos
      setTimeout(() => {
        botonEnviar.disabled = false;
        botonEnviar.textContent = "Enviar"; // Restaura texto original
        mensajeExito.style.display = "none";
      }, 6000); 
    }, 5000); // Simula segundos de carga
  });
