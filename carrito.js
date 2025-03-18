// Se inicializa un array para almacenar los productos en el carrito.
// Si existe un carrito previo guardado en el localStorage, se recupera. Si no, se inicia con un array vacío.
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// Se crea el contenedor principal del carrito y se añade al DOM.
// Este contenedor es donde se mostrarán los productos seleccionados, así como el encabezado y el pie del carrito.
const carritoContainer = document.createElement("div");
carritoContainer.classList.add("carrito-container");
document.body.appendChild(carritoContainer);

// Se define el contenido HTML base del carrito, incluyendo el encabezado con el título, el área donde irán los productos,
// y la sección inferior con el total y un botón para finalizar la compra.
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

// Por defecto, el carrito no es visible hasta que el usuario haga clic en un botón para abrirlo.
carritoContainer.style.display = "none";

// Se identifica el botón que abre el carrito (en este caso, un elemento con id "shopping-bag-bottom").
const carritoBoton = document.getElementById("shopping-bag-bottom");
if (carritoBoton) {
    // Cuando el usuario haga clic en el botón, se mostrará el carrito.
    carritoBoton.addEventListener("click", () => {
        carritoContainer.style.display = "block";
    });
}

// Se selecciona el botón que cierra el carrito.
const cerrarCarrito = document.getElementById("cerrar-carrito");
if (cerrarCarrito) {
    // Al hacer clic en este botón, el carrito se ocultará nuevamente.
    cerrarCarrito.addEventListener("click", () => {
        carritoContainer.style.display = "none";
    });
}

// Busca todos los botones de "Agregar al carrito" en la página.
// Cuando se haga clic en cualquiera de ellos, se añadirá el producto correspondiente al carrito.
document.querySelectorAll(".add-to-cart").forEach(boton => {
    boton.addEventListener("click", (event) => {
        // Encuentra el elemento del producto más cercano al botón que se clicó.
        const productoElement = event.target.closest(".hotsales");
        if (productoElement) {
            // Se extraen los datos necesarios del producto: título, referencia, talla, precio, y la URL de la imagen.
            agregarAlCarrito(
                productoElement.querySelector(".product-title").textContent, // Se obtiene el texto del título del producto.
                productoElement.getAttribute("data-ref"), // Se usa un atributo personalizado para la referencia.
                productoElement.querySelector(".size-letter.selected")?.textContent || "Talla no definida", // Se obtiene la talla seleccionada.
                "Color por definir", 
                parseInt(productoElement.querySelector(".price-discount").textContent.replace(/\D/g, "")),
                productoElement.querySelector(".product img").src 
            );
        }
    });
});

// Esta función actualiza la lista de productos en el carrito.
// También calcula el total, actualiza la cantidad de productos mostrada y guarda el estado del carrito en localStorage.
function actualizarCarrito() {
    // Elemento donde se listan los productos añadidos.
    const carritoItems = document.getElementById("carrito-items");
    // Elemento que muestra la cantidad total de productos en el carrito.
    const cantidadProductos = document.getElementById("cantidad-productos");
    // Elemento que muestra el precio total del carrito.
    const total = document.getElementById("total");

    // Limpia el contenido actual del contenedor de productos antes de volver a llenar la lista.
    carritoItems.innerHTML = "";
    let totalPrecio = 0;

    // Se recorre el array del carrito para crear elementos HTML por cada producto añadido.
    carrito.forEach((item, index) => {
        // Suma el precio total de todos los productos multiplicando cantidad por precio.
        totalPrecio += item.precio * item.cantidad;

        // Crea un nuevo div para cada producto en el carrito, mostrando su nombre, precio, imagen, y controles de cantidad.
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

    // Actualiza el contador de productos y el total mostrado.
    cantidadProductos.innerText = carrito.length;
    total.innerText = `$${totalPrecio.toLocaleString()}`;

    // Guarda el carrito en localStorage para mantener el estado entre recargas.
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

// Cuando se cargue la página, se inicializa el carrito y se asigna un único listener para manejar los clics
// en los botones de incrementar, decrementar y eliminar productos.
document.addEventListener("DOMContentLoaded", () => {
    // Actualiza la interfaz del carrito con los datos guardados.
    actualizarCarrito();

    // Asigna un único listener al contenedor de productos del carrito (delegación de eventos).
    const carritoItems = document.getElementById("carrito-items");
    carritoItems.addEventListener("click", (event) => {
        const index = event.target.getAttribute("data-index");

        // Dependiendo del botón que se haya clicado (sumar, restar, eliminar), se ajusta la cantidad o se elimina el producto.
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

        // Actualiza la interfaz del carrito y guarda los cambios.
        actualizarCarrito();
    });
});

// Listener global para el botón "Finalizar compra".
document.body.addEventListener("click", (event) => {
    // Si se clicó el botón de finalizar compra:
    if (event.target.id === "finalizar-compra") {
        // Si el carrito está vacío, muestra una alerta y no hace nada más.
        if (carrito.length === 0) {
            alert("Tu carrito está vacío.");
            return;
        }
        
        // Si hay productos, muestra un mensaje y vacía el carrito.
        alert("Por ahora no podemos procesar tu compra. Pronto habilitaremos esta función.");
        carrito = [];
        localStorage.removeItem("carrito");
        actualizarCarrito();
    }
});

// Función que añade un producto al carrito.
// Si el producto ya está en el carrito, aumenta la cantidad. Si no, lo añade como un nuevo producto.
function agregarAlCarrito(nombre, referencia, talla, color, precio, imagen) {
    let productoExistente = carrito.find(item => item.nombre === nombre && item.talla === talla);
    if (productoExistente) {
        productoExistente.cantidad++;
    } else {
        carrito.push({ nombre, referencia, talla, color, precio, imagen, cantidad: 1 });
    }
    // Actualiza la interfaz del carrito después de añadir un producto.
    actualizarCarrito();
}
