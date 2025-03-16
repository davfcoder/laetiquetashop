// Lista donde se guardarán los productos agregados al carrito. 
// Se recupera del almacenamiento local (localStorage) para que no se pierda al recargar la página.
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

//  Se crea un contenedor para el carrito de compras (donde se mostrarán los productos).
const carritoContainer = document.createElement("div");
carritoContainer.classList.add("carrito-container");
document.body.appendChild(carritoContainer);

//  Se define la estructura del carrito (encabezado, productos y botón de finalizar compra).
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

//  Se oculta el carrito por defecto hasta que el usuario lo abra.
carritoContainer.style.display = "none";

//  Se selecciona el botón que abre el carrito (la "bolsa de compras").
const carritoBoton = document.getElementById("shopping-bag-bottom");
if (carritoBoton) {
    carritoBoton.addEventListener("click", () => {
        carritoContainer.style.display = "block"; // Muestra el carrito cuando se hace clic.
    });
}

//  Se selecciona el botón de cerrar carrito y se le agrega un evento para ocultarlo.
const cerrarCarrito = document.getElementById("cerrar-carrito");
if (cerrarCarrito) {
    cerrarCarrito.addEventListener("click", () => {
        carritoContainer.style.display = "none"; // Oculta el carrito.
    });
}

//  Se capturan todos los botones de "Agregar al carrito" en la página.
document.querySelectorAll(".add-to-cart").forEach(boton => {
    boton.addEventListener("click", (event) => {
        //  Encuentra el producto más cercano al botón que se hizo clic.
        const productoElement = event.target.closest(".hotsales");
        if (productoElement) {
            //  Llama a la función para agregar el producto al carrito.
            agregarAlCarrito(
                productoElement.querySelector(".product-title").textContent,  // Nombre del producto.
                productoElement.getAttribute("data-ref"),                    // Referencia del producto.
                productoElement.querySelector(".size-letter.selected")?.textContent || "Talla no definida",  // Talla del producto.
                "Color por definir",                                        // Color (se puede cambiar si hay opción de color).
                parseInt(productoElement.querySelector(".price-discount").textContent.replace(/\D/g, "")),  // Precio del producto.
                productoElement.querySelector(".product img").src           // Imagen del producto.
            );
        }
    });
});

//  Función para actualizar el carrito (muestra los productos en la pantalla y actualiza el total).
function actualizarCarrito() {
    const carritoItems = document.getElementById("carrito-items"); // Contenedor de productos en el carrito.
    const cantidadProductos = document.getElementById("cantidad-productos"); // Número de productos en la bolsa.
    const total = document.getElementById("total"); // Total a pagar.

    carritoItems.innerHTML = ""; // Se vacía la lista de productos antes de actualizarla.
    let totalPrecio = 0;

    //  Se recorren todos los productos en el carrito y se muestran en la pantalla.
    carrito.forEach((item, index) => {
        totalPrecio += item.precio * item.cantidad; // Se suma el precio total de todos los productos.

        //  Se crea el elemento HTML para mostrar cada producto en el carrito.
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
        carritoItems.appendChild(carritoItem); // Se agrega el producto al carrito.
    });

    cantidadProductos.innerText = carrito.length; // Se actualiza la cantidad de productos.
    total.innerText = `$${totalPrecio.toLocaleString()}`; // Se actualiza el total a pagar.

    //  Se guarda el carrito en el almacenamiento local para que no se pierda al recargar la página.
    localStorage.setItem("carrito", JSON.stringify(carrito));

    agregarEventosCarrito(); // Se agregan los eventos a los botones de aumentar, disminuir y eliminar.
}

// Función para manejar eventos en los botones de sumar, restar y eliminar productos.
function agregarEventosCarrito() {
    document.getElementById("carrito-items").addEventListener("click", (event) => {
        const index = event.target.getAttribute("data-index");

        if (event.target.classList.contains("sumar")) {
            carrito[index].cantidad++;
        } else if (event.target.classList.contains("restar")) {
            if (carrito[index].cantidad > 1) {
                carrito[index].cantidad--;
            } else {
                carrito.splice(index, 1); // Si queda en 0, se elimina el producto del carrito.
            }
        } else if (event.target.classList.contains("eliminar")) {
            carrito.splice(index, 1); // Se elimina el producto completamente.
        }

        actualizarCarrito(); // Se vuelve a actualizar el carrito.
    });
}

//  Función para el botón "Finalizar compra".
document.body.addEventListener("click", (event) => {
    if (event.target.id === "finalizar-compra") {
        if (carrito.length === 0) {
            alert("Tu carrito está vacío."); // Si el carrito está vacío, se muestra una alerta.
            return;
        }
        
        alert("Por ahora no podemos procesar tu compra. Pronto habilitaremos esta función.");
        carrito = []; // Se vacía el carrito.
        localStorage.removeItem("carrito"); // Se elimina el carrito del almacenamiento local.
        actualizarCarrito(); // Se actualiza la pantalla.
    }
});

//  Función para agregar productos al carrito.
function agregarAlCarrito(nombre, referencia, talla, color, precio, imagen) {
    let productoExistente = carrito.find(item => item.nombre === nombre && item.talla === talla);
    if (productoExistente) {
        productoExistente.cantidad++; // Si ya existe, solo se aumenta la cantidad.
    } else {
        carrito.push({ nombre, referencia, talla, color, precio, imagen, cantidad: 1 }); // Se agrega el nuevo producto.
    }
    actualizarCarrito(); // Se actualiza la pantalla.
}

//  Cuando la página se carga, se actualiza el carrito con los datos guardados.
document.addEventListener("DOMContentLoaded", () => {
    actualizarCarrito();
});
