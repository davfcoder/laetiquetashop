// Chatbot
const btnPorMayor = document.getElementById("btn-por-mayor"); // Selecciona el botón de pedido al por mayor
const chatbotToggle = document.getElementById("chatbot-toggle"); // Selecciona el botón de toggle del chatbot
const chatbotWindow = document.getElementById("chatbot-window"); // Selecciona la ventana del chatbot
const chatbotMessages = document.getElementById("chatbot-messages"); // Selecciona el contenedor de mensajes del chatbot
const chatbotOptions = document.getElementById("chatbot-options"); // Selecciona el contenedor de opciones del chatbot

btnPorMayor.addEventListener("click", function(noRecargar) { // Agrega un evento de clic al botón de pedido al por mayor
  noRecargar.preventDefault(); // Previene que el enlace recargue la página
  chatbotWindow.classList.add("visible"); // Muestra la ventana del chatbot
  chatbotWindow.style.display = "flex"; // Cambia el estilo de la ventana del chatbot
  chatbotMessages.innerHTML = ""; // Limpia los mensajes previos
  mostrarMayor(); // Muestra el menú de pedido al por mayor
});

// Configurar event listeners para los filtros
document.addEventListener('DOMContentLoaded', () => {
  chatbotToggle.addEventListener("click", () => {
    const isVisible = chatbotWindow.classList.contains("visible"); // Verifica si el chatbot está visible

    if (isVisible) { // Si el chatbot está visible
      chatbotWindow.classList.remove("visible"); // Remueve la clase visible
      chatbotWindow.style.display = "none"; // Oculta el chatbot
    } else {
      chatbotWindow.classList.add("visible"); // Agrega la clase visible
      chatbotWindow.style.display = "flex"; // Muestra el chatbot
      chatbotMessages.innerHTML = ""; // Limpia los mensajes previos
      agregarMensaje("👋 Bienvenido a La Etiqueta Yopal, ¿en qué te podemos ayudar hoy?");
      mostrarMenuPrincipal(); // Muestra el menú principal del chatbot
    }
  });
});

function agregarMensaje(texto) { // Función para agregar un mensaje al chatbot
    const msg = document.createElement("div"); // Crea un nuevo elemento div para el mensaje
    msg.innerHTML = texto; // permite HTML dentro de los mensajes
    msg.style.padding = "8px"; // Espaciado interno del mensaje
    msg.style.borderRadius = "10px"; // Bordes redondeados del mensaje
    msg.style.marginBottom = "6px";  // Espaciado entre mensajes
    chatbotMessages.appendChild(msg); // Agrega el mensaje al contenedor de mensajes
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight; // Desplaza el contenedor de mensajes hacia abajo para mostrar el último mensaje
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

function mostrarBotonVolver() { // Función para mostrar el botón de volver al menú principal
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
    <button onclick="abrirEnlace('./mujer.html')">🛒 Ver catálogo mujer</button>
    <button onclick="mostrarCompras()">🔙 Volver al menú anterior</button>
  `;
}

function mostrarComprasHombre() {
  chatbotMessages.innerHTML = "";
  agregarMensaje("👕 Ropa para hombre:");
  chatbotOptions.innerHTML = `
    <button onclick="abrirEnlace('./hombre.html')">🛒 Ver catálogo hombre</button>
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
  
    agregarMensaje(`1. Dirigete a nuestra página de 
  👉 <a href="http://127.0.0.1:5500/devoluciones.html" target="_blank">Devoluciones</a>.<br>
  2. Indica el motivo y sigue las instrucciones.<br>
  3. Recibirás el cambio o reembolso.`);
  
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
      <button onclick="mostrarMayorOtros()">📦 Varios Productos</button>
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
      <button onclick="mostrarPasoFinal('👙 Ropa interior')">👙 Ropa interior</button>
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
<button onclick="mostrarPasoFinal('👔 Camisas')">👔 Camisas y camisetas</button> 
<button onclick="mostrarPasoFinal('👖 Pantalones hombre')">👖 Pantalones</button>
<button onclick="mostrarPasoFinal('🩲 Ropa interior')">🩲 Ropa interior</button>`;
    mostrarBotonVolverAnterior();
  }
  
  // Niño
  function mostrarMayorNino() {
    chatbotMessages.innerHTML = "";
    agregarMensaje("🔔 Recuerda que para un pedido al por mayor mínimo podrás pedir 10 piezas de la misma referencia, pero pueden ser diferentes tallas.");
    agregarMensaje("🧒 ¿Qué tipo de prendas infantiles necesitas?");
    chatbotOptions.innerHTML = `
      <button onclick="mostrarPasoFinal('👕 Camisas')">👕 Camisas</button>
      <button onclick="mostrarPasoFinal('🧦 Medias')">🧦 Medias</button>
      <button onclick="mostrarPasoFinal('👖 Pantalones')">👖 Pantalones</button>
      <button onclick="mostrarPasoFinal('🩳 Traje de baño')">🩳 Traje de baño</button>
      <button onclick="mostrarPasoFinal('👗 Vestidos')">👗 Vestidos</button>
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
    chatbotMessages.innerHTML = ""; // Limpia los mensajes previos
    chatbotOptions.innerHTML = ""; // Limpia las opciones previas
    agregarMensaje(`✅ Perfecto, ya sabemos que estás interesado en ${producto}.`);
    chatbotOptions.innerHTML = `
      <p>📲 Déjanos tu número de teléfono para ponernos en contacto contigo:</p>
      <input type="tel" id="telefono" placeholder="Ej: 3001234567" pattern="[0-9]{10}" maxlength="10" style="width: 100%; padding: 8px; margin-bottom: 10px; border-radius: 8px; border: 1px solid #ccc;" />
      <button onclick="validarTelefono()">📤 Enviar</button>
      <button onclick="window.open('https://wa.me/message/F5MZRJDCEXLIK1', '_blank')">💬 Ir a WhatsApp</button>
    `;
  }
  
  function validarTelefono() { // Función para validar el número de teléfono
    const input = document.getElementById("telefono"); // Selecciona el input de teléfono
    const telefono = input.value; // Obtiene el valor del input de teléfono
    const regex = /^[0-9]{10}$/; // Expresión regular para validar un número de 10 dígitos
  
    if (regex.test(telefono)) { // Si el número es válido
      chatbotMessages.innerHTML = ""; // Limpia los mensajes previos
      chatbotOptions.innerHTML = "";  // Limpia los mensajes y opciones previos
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
  chatbotMessages.innerHTML = ""; // Limpia los mensajes previos
  agregarMensaje("🎉 Al suscribirte podrás disfrutar de:<br>✅ Acceso anticipado a nuevos lanzamientos.<br>✅ Descuentos exclusivos solo para suscriptores.<br>✅ Recomendaciones personalizadas.<br>✅ Novedades directamente en tu correo.");
  chatbotOptions.innerHTML = `<button onclick="mostrarSuscripciones()">🔙 Volver al menú anterior</button>`;
}

function mostrarFormularioSuscripcion() { 
  chatbotMessages.innerHTML = ""; // Limpia los mensajes previos
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

function enviarFormularioSuscripcion() { // Función para enviar el formulario de suscripción
  const correo = document.getElementById("correoSuscripcion").value; // Obtiene el valor del input de correo
  const intereses = document.getElementById("intereses").value; // Obtiene el valor del select
  const nombre = document.getElementById("nombreSuscripcion").value; // Obtiene el nombre del input

  if (correo && correo.includes("@") && nombre.trim() !== "") { // Verifica que el correo y nombre sean válidos
    chatbotMessages.innerHTML = "";  // Limpia los mensajes previos
    chatbotOptions.innerHTML = ""; // Limpia las opciones previas
    agregarMensaje(`✅ ¡Gracias ${nombre}! Te enviaremos información sobre: ${intereses}.`);
    chatbotOptions.innerHTML = `<button onclick="mostrarMenuPrincipal()">🔙 Volver al menú principal</button>`;
  } else { // Si el correo o nombre no son válidos
    alert("Por favor, completa tu nombre y un correo electrónico válido.");
  }
}