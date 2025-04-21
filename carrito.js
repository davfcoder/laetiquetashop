let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// Se crea el contenedor principal del carrito y se añade al DOM.
const carritoContainer = document.createElement("div");
carritoContainer.classList.add("carrito-container");
document.body.appendChild(carritoContainer);

// Contenedor del método de pago (se mostrará cuando se finalice la compra)
const metodoPagoContainer = document.createElement("div");
metodoPagoContainer.classList.add("metodo-pago-container");
document.body.appendChild(metodoPagoContainer);

carritoContainer.innerHTML = `
    <div class="carrito-header">
        <h2>Bolsa (<span id="cantidad-productos">0</span>)</h2>
        <button id="cerrar-carrito" class="cerrar-carrito">&times;</button>
    </div>
    <div id="carrito-items" class="carrito-items"></div>
    <div class="carrito-footer">
        <p class="total-estimado">Total: <span id="total">$0</span></p>
        <button id="finalizar-compra">FINALIZAR COMPRA</button>
    </div>
`;

carritoContainer.style.display = "none";
metodoPagoContainer.style.display = "none"; // Inicialmente oculto

const carritoBoton = document.getElementById("shopping-bag-bottom");
if (carritoBoton) {
    carritoBoton.addEventListener("click", () => {
        carritoContainer.style.display = "block";
    });
}

const cerrarCarritoBoton = document.getElementById("cerrar-carrito");
if (cerrarCarritoBoton) {
    cerrarCarritoBoton.addEventListener("click", () => {
        carritoContainer.style.display = "none";
    });
}

document.querySelectorAll(".add-to-cart").forEach(boton => {
    boton.addEventListener("click", (event) => {
        const productoElement = event.target.closest(".hotsales");
        if (productoElement) {
            const nombre = productoElement.querySelector(".product-title").textContent;
            const referencia = productoElement.getAttribute("data-ref");
            const tallaElement = productoElement.querySelector(".size-letter.selected");
            const talla = tallaElement ? tallaElement.textContent : "Talla no definida";
            const color = "Color por definir";
            const precioTexto = productoElement.querySelector(".price-discount").textContent;
            // Limpiar el formato del precio antes de parsear
            const precioNumerico = parseFloat(precioTexto.replace(/[^\d,.-]/g, '').replace('.', '').replace(',', '.'));
            const imagen = productoElement.querySelector(".product img").src;

            agregarAlCarrito(nombre, referencia, talla, color, precioNumerico, imagen);
        }
    });
});

function crearItemCarritoHTML(item, index) {
    const carritoItem = document.createElement("div");
    carritoItem.classList.add("carrito-item");
    carritoItem.innerHTML = `
        <img src="${item.imagen}" alt="${item.nombre}" class="carrito-img" />
        <div>
            <p class="nombre-producto">${item.nombre}</p>
            <p class="detalle-producto">Ref: ${item.referencia} - ${item.talla}, ${item.color}</p>
            <p class="precio-producto">$${item.precio ? item.precio.toLocaleString('es-CO', { minimumFractionDigits: 0, maximumFractionDigits: 0 }) : 'Precio no disponible'}</p>
            <div class="cantidad-control">
                <button class="restar" data-index="${index}">-</button>
                <span>${item.cantidad}</span>
                <button class="sumar" data-index="${index}">+</button>
            </div>
        </div>
        <button class="eliminar" data-index="${index}">🗑</button>
    `;
    return carritoItem;
}

// Función para actualizar el carrito
function actualizarCarrito() {
    const carritoItems = document.getElementById("carrito-items");
    const cantidadProductosElement = document.getElementById("cantidad-productos");
    const totalElement = document.getElementById("total");

    carritoItems.innerHTML = "";
    let totalPrecio = 0;

    carrito.forEach((item, index) => {
        totalPrecio += item.precio * item.cantidad;
        carritoItems.appendChild(crearItemCarritoHTML(item, index));
    });

    cantidadProductosElement.innerText = carrito.reduce((sum, item) => sum + item.cantidad, 0); // Muestra la cantidad total de items
    totalElement.innerText = `$${totalPrecio.toLocaleString('es-CO', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

document.addEventListener("DOMContentLoaded", () => {
    actualizarCarrito();

    const carritoItems = document.getElementById("carrito-items");
    carritoItems.addEventListener("click", (event) => {
        const indexStr = event.target.getAttribute("data-index");
        if (indexStr !== null) {
            const index = parseInt(indexStr, 10);
            if (event.target.classList.contains("sumar")) {
                carrito[index].cantidad++;
            } else if (event.target.classList.contains("restar")) {
                if (carrito[index].cantidad > 1) {
                    carrito[index].cantidad--;
                } else {
                    carrito.splice(index, 1);
                }
            } else if (event.target.classList.contains("eliminar")) {
                carrito.splice(index, 1);
            }
            actualizarCarrito();
        }
    });
});

function mostrarMetodoPago() {
    metodoPagoContainer.style.display = "block";
    let totalCompra = carrito.reduce((total, item) => total + (item.precio * item.cantidad), 0);
    let costoEnvio = 20; // Simulación de costo de envío
    let totalConEnvio = totalCompra + costoEnvio;

    metodoPagoContainer.innerHTML = `
        <div class="metodo-pago-header">
            <h2>Resumen de la compra</h2>
            <button id="cerrar-pago" class="cerrar-pago">&times;</button>
        </div>
        <div class="metodo-pago-body">
            <h3>Dirección de Envío:</h3>
            <form id="direccion-form">
                <input type="text" id="nombre" placeholder="Nombre completo" required>
                <input type="text" id="direccion" placeholder="Dirección" required>
                <input type="text" id="ciudad" placeholder="Ciudad" required>
                <input type="text" id="codigo-postal" placeholder="Código Postal" required>
                <input type="tel" id="telefono" placeholder="Teléfono" required>
            </form>

            <h3>Selecciona tu Método de Pago</h3>
            <select id="metodo-pago-select">
                <option value="tarjetaC">Tarjeta de Crédito</option>
                <option value="tarjetaD">Tarjeta de Debito</option>
                <option value="paypal">PayPal</option>
                <option value="googlepay">googlepay</option>
                <option value="applepay">applepay</option>
            </select>

            <div id="metodo-pago-form"></div>

            <h3>Detalles de la Compra:</h3>
            <p>Total productos: $${totalCompra.toLocaleString('es-CO', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</p>
            <p>Costo de envío: $${costoEnvio.toLocaleString('es-CO', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</p>
            <p>Total con envío: $${totalConEnvio.toLocaleString('es-CO', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</p>
        </div>
        <div class="metodo-pago-footer">
            <button id="confirmar-pago">Pagar</button>
        </div>
    `;

    document.getElementById("cerrar-pago").addEventListener("click", () => {
        metodoPagoContainer.style.display = "none";
        carritoContainer.style.display = "block"; // Volver a mostrar el carrito
    });

    const metodoPagoSelect = document.getElementById("metodo-pago-select");
    metodoPagoSelect.addEventListener("change", actualizarMetodoPago);
    actualizarMetodoPago();

    const confirmarPagoBoton = document.getElementById("confirmar-pago");
    confirmarPagoBoton.addEventListener("click", () => {
        const direccionForm = document.getElementById("direccion-form");
        if (direccionForm.checkValidity()) {
            // Aquí iría la lógica para procesar el pago
            const metodoPagoSeleccionado = metodoPagoSelect.value;
            // TODO: Implementar lógica de pago según el método seleccionado
            console.log("Pago procesado con", metodoPagoSeleccionado);
            // Simulación de limpieza del carrito después del pago
            carrito = [];
            localStorage.removeItem("carrito");
            actualizarCarrito();
            alert("Pago procesado exitosamente. ¡Gracias por tu compra!");
            metodoPagoContainer.style.display = "none";
        } else {
            alert("Por favor, completa todos los campos de la dirección de envío.");
        }
    });
}

// Evento para finalizar la compra y mostrar la pantalla de pago
document.body.addEventListener("click", (event) => {
    if (event.target.id === "finalizar-compra") {
        if (carrito.length === 0) {
            alert("Tu carrito está vacío.");
            return;
        }
        carritoContainer.style.display = "none";
        mostrarMetodoPago();
    }
});

// Función para actualizar los campos del formulario de pago según el método seleccionado
function actualizarMetodoPago() {
    const metodoPago = document.getElementById("metodo-pago-select").value;
    const metodoPagoForm = document.getElementById("metodo-pago-form");

    if (metodoPago === "tarjetaC") {
        metodoPagoForm.innerHTML = `
            <h4>Datos de la tarjeta</h4>
            <input type="text" id="tarjeta-numero" placeholder="Número de tarjeta" required>
            <input type="text" id="tarjeta-expiracion" placeholder="MM/AA" required>
            <input type="text" id="tarjeta-cvv" placeholder="CVV" required>
    
            <h4>Cuotas</h4>
            <select id="numero-cuotas">
                <option value="1">1 cuota</option>
                <option value="2">2 cuotas</option>
                <option value="3">3 cuotas</option>
                <option value="6">6 cuotas</option>
                <option value="9">9 cuotas</option>
                <option value="12">12 cuotas</option>
                </select>
        `;
    } else if (metodoPago === "tarjetaD") {
        metodoPagoForm.innerHTML = `
            <h4>Datos de la tarjeta</h4>
            <input type="text" id="tarjeta-numero" placeholder="Número de tarjeta" required>
            <input type="text" id="tarjeta-expiracion" placeholder="MM/AA" required>
            <input type="text" id="tarjeta-cvv" placeholder="CVV" required>
        `;
    }else if (metodoPago === "paypal") {
        metodoPagoForm.innerHTML = `
            <h4>Cuenta de PayPal</h4>
            <input type="email" id="paypal-cuenta" placeholder="Correo electrónico de PayPal" required>
        `;
    } else if (metodoPago === "googlepay") {
        metodoPagoForm.innerHTML = `
            <h4>Cuenta de googlepay</h4>
            <input type="email" id="googlepay-cuenta" placeholder="Correo electrónico de googlepay" required>
        `;
    }else if (metodoPago === "applepay") {
        metodoPagoForm.innerHTML = `
            <h4>Cuenta de applepay</h4>
            <input type="email" id="applepay-cuenta" placeholder="Correo electrónico de applepay" required>
        `;
    }else {
        metodoPagoForm.innerHTML = ""; // Limpiar si no hay selección
    }
}

// Función para agregar productos al carrito
function agregarAlCarrito(nombre, referencia, talla, color, precio, imagen) {
    // Asegurarse de que el precio sea un número
    const precioNumerico = typeof precio === 'string' ? parseFloat(precio.replace(/[^\d,.-]/g, '').replace('.', '').replace(',', '.')) : precio;

    let productoExistente = carrito.find(item => item.nombre === nombre && item.talla === talla);
    if (productoExistente) {
        productoExistente.cantidad++;
    } else {
        carrito.push({ nombre, referencia, talla, color, precio: precioNumerico, imagen, cantidad: 1 });
    }
    actualizarCarrito();
}