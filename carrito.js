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

const carritoBoton = document.getElementById("shopping-bag-bottom");
if (carritoBoton) {
    carritoBoton.addEventListener("click", () => {
        carritoContainer.style.display = "block";
    });
}

const cerrarCarrito = document.getElementById("cerrar-carrito");
if (cerrarCarrito) {
    cerrarCarrito.addEventListener("click", () => {
        carritoContainer.style.display = "none";
    });
}

document.querySelectorAll(".add-to-cart").forEach(boton => {
    boton.addEventListener("click", (event) => {
        const productoElement = event.target.closest(".hotsales");
        if (productoElement) {
            agregarAlCarrito(
                productoElement.querySelector(".product-title").textContent,
                productoElement.getAttribute("data-ref"),
                productoElement.querySelector(".size-letter.selected")?.textContent || "Talla no definida",
                "Color por definir", 
                parseInt(productoElement.querySelector(".price-discount").textContent.replace(/\D/g, "")),
                productoElement.querySelector(".product img").src
            );
        }
    });
});

// Función para actualizar el carrito
function actualizarCarrito() {
    const carritoItems = document.getElementById("carrito-items");
    const cantidadProductos = document.getElementById("cantidad-productos");
    const total = document.getElementById("total");

    carritoItems.innerHTML = "";
    let totalPrecio = 0;

    carrito.forEach((item, index) => {
        totalPrecio += item.precio * item.cantidad;

        const carritoItem = document.createElement("div");
        carritoItem.classList.add("carrito-item");
        carritoItem.innerHTML = `
            <img src="${item.imagen}" alt="${item.nombre}" class="carrito-img" />
            <div>
                <p class="nombre-producto">${item.nombre}</p>
                <p class="detalle-producto">Ref: ${item.referencia} - ${item.talla}, ${item.color}</p>
                <p class="precio-producto">$${item.precio.toLocaleString()}</p>
                <div class="cantidad-control">
                    <button class="restar" data-index="${index}">-</button>
                    <span>${item.cantidad}</span>
                    <button class="sumar" data-index="${index}">+</button>
                </div>
            </div>
            <button class="eliminar" data-index="${index}">🗑</button>
        `;
        carritoItems.appendChild(carritoItem);
    });

    cantidadProductos.innerText = carrito.length;
    total.innerText = `$${totalPrecio.toLocaleString()}`;

    localStorage.setItem("carrito", JSON.stringify(carrito));
}

// Manejo de clics en los botones de incrementar, decrementar y eliminar productos.
document.addEventListener("DOMContentLoaded", () => {
    actualizarCarrito();

    const carritoItems = document.getElementById("carrito-items");
    carritoItems.addEventListener("click", (event) => {
        const index = event.target.getAttribute("data-index");

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
    });
});

// Evento para finalizar la compra y mostrar la pantalla de pago
document.body.addEventListener("click", (event) => {
    if (event.target.id === "finalizar-compra") {
        if (carrito.length === 0) {
            alert("Tu carrito está vacío.");
            return;
        }
        
        // Ocultar el carrito y mostrar la pantalla de pago
        carritoContainer.style.display = "none";
        mostrarMetodoPago();
    }
});

// Mostrar la pantalla de pago
function mostrarMetodoPago() {
    metodoPagoContainer.style.display = "block"; // Muestra la sección de pago
    let totalCompra = carrito.reduce((total, item) => total + (item.precio * item.cantidad), 0);
    let costoEnvio = 20; // Simulamos un costo de envío fijo
    let totalConEnvio = totalCompra + costoEnvio;

    metodoPagoContainer.innerHTML = `
        <div class="metodo-pago-header">
            <h2>Resumen de la compra</h2>
            <button id="cerrar-pago" class="cerrar-pago">&times;</button>
        </div>
        <div class="metodo-pago-body">
            <h3>Dirección de Envío:</h3>
            <form id="direccion-form">
                <input type="text" id="nombre" placeholder="Nombre completo">
                <input type="text" id="direccion" placeholder="Dirección">
                <input type="text" id="ciudad" placeholder="Ciudad">
                <input type="text" id="codigo-postal" placeholder="Código Postal">
                <input type="text" id="telefono" placeholder="Teléfono">
            </form>

            <h3>Selecciona tu Método de Pago</h3>
            <select id="metodo-pago-select">
                <option value="tarjeta">Tarjeta de Crédito</option>
                <option value="paypal">PayPal</option>
            </select>

            <div id="metodo-pago-form"></div>

            <h3>Detalles de la Compra:</h3>
            <p>Total productos: $${totalCompra.toLocaleString()}</p>
            <p>Costo de envío: $${costoEnvio.toLocaleString()}</p>
            <p>Total con envío: $${totalConEnvio.toLocaleString()}</p>
        </div>
        <div class="metodo-pago-footer">
            <button id="confirmar-pago">Pagar</button>
        </div>
    `;

    document.getElementById("cerrar-pago").addEventListener("click", () => {
        metodoPagoContainer.style.display = "none";
    });

    // Actualizar el formulario de acuerdo al método de pago seleccionado
    document.getElementById("metodo-pago-select").addEventListener("change", actualizarMetodoPago);
    actualizarMetodoPago();

    document.getElementById("confirmar-pago").addEventListener("click", () => {
        // Limpiar el carrito y actualizar la interfaz
        carrito = [];
        localStorage.removeItem("carrito");
        actualizarCarrito(); // Para asegurarse de que la interfaz se actualice

        alert("Pago procesado exitosamente. ¡Gracias por tu compra!");
        metodoPagoContainer.style.display = "none"; // Ocultar la pantalla de pago
    });
}

// Función para actualizar los campos del formulario de pago según el método seleccionado
function actualizarMetodoPago() {
    const metodoPago = document.getElementById("metodo-pago-select").value;
    const metodoPagoForm = document.getElementById("metodo-pago-form");

    if (metodoPago === "tarjeta") {
        metodoPagoForm.innerHTML = `
            <h4>Datos de la tarjeta</h4>
            <input type="text" id="tarjeta-numero" placeholder="Número de tarjeta">
            <input type="text" id="tarjeta-expiracion" placeholder="MM/AA">
            <input type="text" id="tarjeta-cvv" placeholder="CVV">
        `;
    } else if (metodoPago === "paypal") {
        metodoPagoForm.innerHTML = `
            <h4>Cuenta de PayPal</h4>
            <input type="email" id="paypal-cuenta" placeholder="Correo electrónico de PayPal">
        `;
    }
}

// Función para agregar productos al carrito
function agregarAlCarrito(nombre, referencia, talla, color, precio, imagen) {
    let productoExistente = carrito.find(item => item.nombre === nombre && item.talla === talla);
    if (productoExistente) {
        productoExistente.cantidad++;
    } else {
        carrito.push({ nombre, referencia, talla, color, precio, imagen, cantidad: 1 });
    }
    actualizarCarrito();
}
