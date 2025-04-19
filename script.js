
// Navbar fijo
const navbar = document.getElementById("navbar"); // Selecciona el navbar
const logo = document.getElementById("logo-secundario"); // Selecciona el logo secundario
const bolsa = document.getElementById("bolsa-icon"); // Selecciona el logo secundario
const navbarOffset = navbar.offsetTop; // Guarda la posición original del navbar
const navbarHeight = navbar.offsetHeight;
const body = document.body; // O el contenedor principal

window.addEventListener("scroll", function () { // Agrega un evento de desplazamiento a la ventana
    if (window.scrollY >= navbarOffset) { // Si el desplazamiento es mayor o igual a la posición original del navbar
        navbar.classList.add("fixed-top", "shadow"); // Agrega las clases para fijar el navbar y sombra
        logo.classList.add("visible"); // Aparece suavemente
        bolsa.classList.add("visible"); // Aparece suavemente
        body.style.paddingTop = `${navbarHeight}px`; // Agrega espacio
    } else {
        navbar.classList.remove("fixed-top", "shadow"); // Quita las clases para fijar el navbar y sombra
        logo.classList.remove("visible"); // Aparece suavemente
        bolsa.classList.remove("visible"); // Aparece suavemente
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



// Chatbot
const chatbotToggle = document.getElementById("chatbot-toggle");
const chatbotWindow = document.getElementById("chatbot-window");
const chatbotMessages = document.getElementById("chatbot-messages");
const chatbotOptions = document.getElementById("chatbot-options");

chatbotToggle.addEventListener("click", () => {
  const isVisible = chatbotWindow.classList.contains("visible");

  if (isVisible) {
    chatbotWindow.classList.remove("visible");
    chatbotWindow.style.display = "none";
  } else {
    chatbotWindow.classList.add("visible");
    chatbotWindow.style.display = "flex";
    chatbotMessages.innerHTML = "";
    agregarMensaje("👋 Bienvenido a La Etiqueta Yopal, ¿en qué te podemos apoyar hoy?");
    mostrarMenuPrincipal();
  }
});

function agregarMensaje(texto) {
    const msg = document.createElement("div");
    msg.innerHTML = texto; // permite HTML dentro de los mensajes
    msg.style.padding = "8px";
    msg.style.borderRadius = "10px";
    msg.style.marginBottom = "6px";
    msg.style.backgroundColor = "#f1f1f1";
    chatbotMessages.appendChild(msg);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
  }
  

function mostrarMenuPrincipal() {
    // Limpiamos mensajes previos
    chatbotMessages.innerHTML = "";
  
    // Mostramos el mensaje de bienvenida nuevamente
    agregarMensaje("👋 Bienvenido a La Etiqueta Yopal, ¿en qué te podemos apoyar hoy?");
  
    // Mostramos opciones principales
    chatbotOptions.innerHTML = `
      <button onclick="mostrarCompras()">🛍 Compras</button>
      <button onclick="mostrarDevoluciones()">📦 Devoluciones</button>
      <button onclick="mostrarMayor()">📦 Pedido al por mayor</button>
      <button onclick="mostrarSuscripciones()">📬 Suscripciones</button>
    `;
  }


function mostrarBotonVolver() {
  chatbotOptions.innerHTML += `
    <button onclick="mostrarMenuPrincipal()">🔙 Volver al menú principal</button>
  `;
}

// COMPRAS
function mostrarCompras() {
  chatbotMessages.innerHTML = "";
  agregarMensaje("🛍️ ¿Qué tipo de ropa estás buscando?");
  chatbotOptions.innerHTML = `
    <button onclick="mostrarComprasMujer()">👗 Mujer</button>
    <button onclick="mostrarComprasHombre()">👕 Hombre</button>
    <button onclick="mostrarComprasNino()">🧒 Niño</button>
    <button onclick="mostrarComprasAccesorios()">👜 Accesorios</button>
  `;
  mostrarBotonVolver();
}

function mostrarComprasMujer() {
  chatbotMessages.innerHTML = "";
  agregarMensaje("👗 Ropa para mujer:");
  chatbotOptions.innerHTML = `
    <button onclick="abrirEnlace('https://laetiqueta.com/mujer')">🛒 Ver catálogo mujer</button>
    <button onclick="mostrarCompras()">🔙 Volver al menú anterior</button>
  `;
}

function mostrarComprasHombre() {
  chatbotMessages.innerHTML = "";
  agregarMensaje("👕 Ropa para hombre:");
  chatbotOptions.innerHTML = `
    <button onclick="abrirEnlace('https://laetiqueta.com/hombre')">🛒 Ver catálogo hombre</button>
    <button onclick="mostrarCompras()">🔙 Volver al menú anterior</button>
  `;
}

function mostrarComprasNino() {
  chatbotMessages.innerHTML = "";
  agregarMensaje("🧒 Ropa para niños:");
  chatbotOptions.innerHTML = `
    <button onclick="abrirEnlace('https://laetiqueta.com/niños')">🛒 Ver catálogo infantil</button>
    <button onclick="mostrarCompras()">🔙 Volver al menú anterior</button>
  `;
}

function mostrarComprasAccesorios() {
  chatbotMessages.innerHTML = "";
  agregarMensaje("👜 Accesorios disponibles:");
  chatbotOptions.innerHTML = `
    <button onclick="abrirEnlace('https://laetiqueta.com/accesorios')">🛒 Ver catálogo de accesorios</button>
    <button onclick="mostrarCompras()">🔙 Volver al menú anterior</button>
  `;
}


// DEVOLUCIONES
function mostrarDevoluciones() {
    chatbotOptions.innerHTML = ""; // limpia el menú antes de mostrar contenido nuevo
  
    agregarMensaje("📦 Aquí tienes el paso a paso para devoluciones:");
  
    agregarMensaje(`1. Comunícate con nosotros por 
  👉 <a href="https://wa.me/message/F5MZRJDCEXLIK1" target="_blank">WhatsApp</a> 
  o escribe a 📧 <a href="mailto:laetiquetayopal@gmail.com">laetiquetayopal@gmail.com</a>.<br>
  2. Indica el motivo y número de pedido.<br>
  3. Empaca el producto en su estado original.<br>
  4. Te enviaremos una guía para el envío.<br>
  5. Recibirás el cambio o reembolso.`);
  
    mostrarBotonVolver();
  }

// PEDIDO AL POR MAYOR
function mostrarMayor() {
    chatbotMessages.innerHTML = "";
    agregarMensaje("📦 ¿Qué tipo de productos te interesan al por mayor?");
    chatbotOptions.innerHTML = `
      <button onclick="mostrarMayorMujer()">👗 Mujer</button>
      <button onclick="mostrarMayorHombre()">👕 Hombre</button>
      <button onclick="mostrarMayorNino()">🧒 Niño</button>
      <button onclick="mostrarMayorAccesorios()">👜 Accesorios</button>
      <button onclick="mostrarMayorOtros()">📦 Otros</button>
    `;
    mostrarBotonVolver();
  }
  
  // Mujer
  function mostrarMayorMujer() {
    chatbotMessages.innerHTML = "";
    agregarMensaje("🔔 Recuerda que para un pedido al por mayor mínimo podrás pedir 10 piezas de la misma referencia, pero pueden ser diferentes tallas.");
    agregarMensaje("👗 ¿Qué tipo de prendas te interesan al por mayor?");
    chatbotOptions.innerHTML = `
      <button onclick="mostrarPasoFinal('👚 Camisas y blusas')">👚 Camisas y blusas</button>
      <button onclick="mostrarPasoFinal('👗 Vestidos')">👗 Vestidos</button>
      <button onclick="mostrarPasoFinal('👗 Faldas')">👗 Faldas</button>
      <button onclick="mostrarPasoFinal('👖 Pantalones mujer')">👖 Pantalones</button>
    `;
    mostrarBotonVolverAnterior();
  }
  
  // Hombre
  function mostrarMayorHombre() {
    chatbotMessages.innerHTML = "";
    agregarMensaje("🔔 Recuerda que para un pedido al por mayor mínimo podrás pedir 10 piezas de la misma referencia, pero pueden ser diferentes tallas.");
    agregarMensaje("👕 ¿Qué tipo de prendas deseas para hombres al por mayor?");
    chatbotOptions.innerHTML = `
      <button onclick="mostrarPasoFinal('👕 Polos')">👕 Polos</button>
      <button onclick="mostrarPasoFinal('🩳 Bermudas')">🩳 Bermudas</button>
      <button onclick="mostrarPasoFinal('👔 Camisas y camisetas')">👔 Camisas y camisetas</button>
      <button onclick="mostrarPasoFinal('👖 Pantalones hombre')">👖 Pantalones</button>
    `;
    mostrarBotonVolverAnterior();
  }
  
  // Niño
  function mostrarMayorNino() {
    chatbotMessages.innerHTML = "";
    agregarMensaje("🔔 Recuerda que para un pedido al por mayor mínimo podrás pedir 10 piezas de la misma referencia, pero pueden ser diferentes tallas.");
    agregarMensaje("🧒 ¿Qué tipo de prendas infantiles necesitas?");
    chatbotOptions.innerHTML = `
      <button onclick="mostrarPasoFinal('👕 Camisetas y pantalones niño')">👕 Camisetas y pantalones</button>
      <button onclick="mostrarPasoFinal('👗 Ropa para niñas')">👗 Ropa para niñas</button>
      <button onclick="mostrarPasoFinal('🍼 Ropa de bebé')">🍼 Bebés</button>
      <button onclick="mostrarPasoFinal('🎽 Conjuntos infantiles')">🎽 Conjuntos</button>
    `;
    mostrarBotonVolverAnterior();
  }
  
  // Accesorios
  function mostrarMayorAccesorios() {
    chatbotMessages.innerHTML = "";
    agregarMensaje("🔔 Recuerda que para un pedido al por mayor mínimo podrás pedir 10 piezas de la misma referencia, pero pueden ser diferentes tallas.");
    agregarMensaje("👜 ¿Qué tipo de accesorios te interesan?");
    chatbotOptions.innerHTML = `
      <button onclick="mostrarPasoFinal('🧢 Gorras')">🧢 Gorras</button>
      <button onclick="mostrarPasoFinal('👖 Cinturones')">👖 Cinturones</button>
      <button onclick="mostrarPasoFinal('👜 Bolsos')">👜 Bolsos</button>
      <button onclick="mostrarPasoFinal('🕶 Gafas')">🕶 Gafas</button>
      <button onclick="mostrarPasoFinal('👛 Carteras')">👛 Carteras</button>
    `;
    mostrarBotonVolverAnterior();
  }
  
  // Otros
  function mostrarMayorOtros() {
    chatbotMessages.innerHTML = "";
    agregarMensaje("📦 Para otros productos o solicitudes especiales:");
    agregarMensaje("1. Contáctanos directamente para asesoría personalizada.");
    agregarMensaje("2. Indícanos el tipo de producto o idea que tienes en mente.");
    agregarMensaje("3. Revisa disponibilidad, cantidades mínimas y precios especiales.");
    chatbotOptions.innerHTML = `
      <button onclick="window.open('https://wa.me/message/F5MZRJDCEXLIK1', '_blank')">💬 Contactar por WhatsApp</button>
    `;
    mostrarBotonVolverAnterior();
  }
  
  // Paso final después de elegir un producto
  function mostrarPasoFinal(producto) {
    chatbotMessages.innerHTML = "";
    chatbotOptions.innerHTML = "";
    agregarMensaje(`✅ Perfecto, ya sabemos que estás interesado en ${producto}.`);
    chatbotOptions.innerHTML = `
      <p>📲 Déjanos tu número de teléfono para ponernos en contacto contigo:</p>
      <input type="tel" id="telefono" placeholder="Ej: 3001234567" pattern="[0-9]{10}" maxlength="10" style="width: 100%; padding: 8px; margin-bottom: 10px; border-radius: 8px; border: 1px solid #ccc;" />
      <button onclick="validarTelefono()">📤 Enviar</button>
      <button onclick="window.open('https://wa.me/message/F5MZRJDCEXLIK1', '_blank')">💬 Ir a WhatsApp</button>
    `;
  }
  
  function validarTelefono() {
    const input = document.getElementById("telefono");
    const telefono = input.value;
    const regex = /^[0-9]{10}$/;
  
    if (regex.test(telefono)) {
      chatbotMessages.innerHTML = "";
      chatbotOptions.innerHTML = "";
      agregarMensaje("✅ ¡Gracias! Te contactaremos pronto al número: " + telefono);
      chatbotOptions.innerHTML = `<button onclick="mostrarMenuPrincipal()">🔙 Volver al menú principal</button>`;
    } else {
      alert("Por favor, ingresa un número válido de 10 dígitos.");
    }
  }
  
  // Botón volver al menú anterior
  function mostrarBotonVolverAnterior() {
    chatbotOptions.innerHTML += `
      <button onclick="mostrarMayor()">🔙 Volver al menú anterior</button>
    `;
  }
  
  
  

// SUSCRIPCIONES
function mostrarSuscripciones() {
  chatbotMessages.innerHTML = "";
  agregarMensaje("📬 Elige una opción:");
  chatbotOptions.innerHTML = `
    <button onclick="mostrarBeneficiosSuscripcion()">🎁 Beneficios de suscribirte</button>
    <button onclick="mostrarFormularioSuscripcion()">📝 Suscríbete</button>
  `;
  mostrarBotonVolver();
}

function mostrarBeneficiosSuscripcion() {
  chatbotMessages.innerHTML = "";
  agregarMensaje("🎉 Al suscribirte podrás disfrutar de:<br>✅ Acceso anticipado a nuevos lanzamientos.<br>✅ Descuentos exclusivos solo para suscriptores.<br>✅ Recomendaciones personalizadas.<br>✅ Novedades directamente en tu correo.");
  chatbotOptions.innerHTML = `<button onclick="mostrarSuscripciones()">🔙 Volver al menú anterior</button>`;
}

function mostrarFormularioSuscripcion() {
  chatbotMessages.innerHTML = "";
  agregarMensaje("📝 Por favor completa el siguiente formulario para suscribirte:");
  chatbotOptions.innerHTML = `
    <input type="text" id="nombreSuscripcion" placeholder="Tu nombre" style="width: 100%; padding: 8px; margin-bottom: 10px; border-radius: 8px; border: 1px solid #ccc;" />
    <input type="email" id="correoSuscripcion" placeholder="Tu correo electrónico" style="width: 100%; padding: 8px; margin-bottom: 10px; border-radius: 8px; border: 1px solid #ccc;" />
    <label for="intereses">¿Qué información te interesa más?</label>
    <select id="intereses" style="width: 100%; padding: 8px; margin-top: 6px; margin-bottom: 10px; border-radius: 8px; border: 1px solid #ccc;">
      <option value="mujer">👗 Productos de mujer</option>
      <option value="hombre">👕 Productos de hombre</option>
      <option value="niño">🧒 Ropa infantil</option>
      <option value="accesorios">👜 Accesorios</option>
      <option value="todos">📦 Todos los anteriores</option>
    </select>
    <button onclick="enviarFormularioSuscripcion()">📤 Suscribirse</button>
    <button onclick="mostrarSuscripciones()">🔙 Volver al menú anterior</button>
  `;
}

function enviarFormularioSuscripcion() {
  const correo = document.getElementById("correoSuscripcion").value;
  const intereses = document.getElementById("intereses").value;
  const nombre = document.getElementById("nombreSuscripcion").value;

  if (correo && correo.includes("@") && nombre.trim() !== "") {
    chatbotMessages.innerHTML = "";
    chatbotOptions.innerHTML = "";
    agregarMensaje(`✅ ¡Gracias ${nombre}! Te enviaremos información sobre: ${intereses}.`);
    chatbotOptions.innerHTML = `<button onclick="mostrarMenuPrincipal()">🔙 Volver al menú principal</button>`;
  } else {
    alert("Por favor, completa tu nombre y un correo electrónico válido.");
  }
}


// RESPUESTA POR DEFECTO
function respuestaAutomatica(userInput) {
  agregarMensaje("🤖 No estoy seguro cómo ayudarte con eso. Te redireccionaré a WhatsApp...");
  setTimeout(() => {
    window.open("https://wa.me/message/F5MZRJDCEXLIK1", "_blank");
  }, 2000);
}






 






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