document.addEventListener("DOMContentLoaded", function () {
    // Crear el contenedor de la Wishlist y añadirlo al DOM
    const wishlistContainer = document.createElement("div");
    wishlistContainer.classList.add("wishlist-container");
    document.body.appendChild(wishlistContainer);

    // Crear el contenido del contenedor de Wishlist
    wishlistContainer.innerHTML = `
        <div class="wishlist-header">
            <h2>Wishlist</h2>
            <button id="cerrar-wishlist" class="cerrar-wishlist">&times;</button>
        </div>
        <div id="wishlist-items" class="wishlist-items">
            <!-- Los items de la Wishlist irán aquí -->
        </div>
    `;

    // Estilos del contenedor del Wishlist
    wishlistContainer.style.position = "fixed";
    wishlistContainer.style.top = "0";
    wishlistContainer.style.right = "0";
    wishlistContainer.style.width = "400px";  // Aumentado el ancho
    wishlistContainer.style.height = "100%";
    wishlistContainer.style.backgroundColor = "#f5f5f5";  // Fondo más suave
    wishlistContainer.style.boxShadow = "-2px 0 5px rgba(0, 0, 0, 0.3)";
    wishlistContainer.style.padding = "30px";
    wishlistContainer.style.zIndex = "1000";
    wishlistContainer.style.display = "none"; // Inicialmente oculto

    // Obtener el botón de Wishlist
    const wishlistButton = document.getElementById("wishlist-link");

    // Mostrar el contenedor del Wishlist al hacer clic en el botón
    wishlistButton.addEventListener("click", function () {
        wishlistContainer.style.display = "block"; // Mostrar el contenedor del Wishlist
        renderWishlist(); // Mostrar los productos de la Wishlist
    });

    // Cerrar el contenedor del Wishlist al hacer clic en el botón de cerrar
    const cerrarWishlist = document.getElementById("cerrar-wishlist");
    cerrarWishlist.addEventListener("click", function () {
        wishlistContainer.style.display = "none"; // Ocultar el contenedor del Wishlist
    });

    // Cargar los productos guardados en localStorage
    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

    // Función para agregar el producto a la Wishlist
    function agregarAlWishlist(productId, productName, productPrice, productImg) {
        // Verificar si el producto ya está en la wishlist
        if (wishlist.some((product) => product.productId === productId)) {
            return; // Si ya está, no hacer nada
        }

        // Crear un nuevo item en la Wishlist
        wishlist.push({ productId, productName, productPrice, productImg });
        localStorage.setItem("wishlist", JSON.stringify(wishlist));

        renderWishlist(); // Actualizar la vista de la Wishlist
    }

    // Función para eliminar un producto de la Wishlist
    function eliminarDeWishlist(productId) {
        // Filtrar el producto a eliminar
        wishlist = wishlist.filter((product) => product.productId !== productId);
        localStorage.setItem("wishlist", JSON.stringify(wishlist));

        renderWishlist(); // Actualizar la vista de la Wishlist
        updateHeartIcon(productId, "vacío"); // Actualizar ícono de corazón al eliminar
    }

    // Función para mostrar la lista de productos en la Wishlist
    function renderWishlist() {
        const wishlistItems = document.getElementById("wishlist-items");
        wishlistItems.innerHTML = ""; // Limpiar el contenido

        wishlist.forEach((product) => {
            const item = document.createElement("div");
            item.classList.add("wishlist-item");
            item.innerHTML = `
                <div>
                    <img src="${product.productImg}" alt="${product.productName}" class="wishlist-product-img">
                    <p>${product.productName}</p>
                    <p>Precio: ${product.productPrice}</p>
                    <button class="eliminar-wishlist" data-product-id="${product.productId}">Eliminar</button>
                </div>
            `;
            wishlistItems.appendChild(item);

            // Lógica para eliminar el producto de la Wishlist al hacer clic en el botón eliminar
            item.querySelector(".eliminar-wishlist").addEventListener("click", function () {
                eliminarDeWishlist(product.productId);
            });
        });
    }

    // Función para manejar los clics en los botones de "corazón"
    const wishlistButtons = document.querySelectorAll(".wishlist-button");

    wishlistButtons.forEach((button) => {
        button.addEventListener("click", function () {
            const icon = button.querySelector(".wishlist-icon");
            const productId = button.getAttribute("data-product-id");

            // Obtener los detalles del producto usando el productId directamente
            const productElement = document.getElementById(productId);  // Ahora con el mismo id
            if (!productElement) {
                console.error("Producto no encontrado en la página");
                return;
            }

            const productTitle = productElement.querySelector(".product-title");
            const productPrice = productElement.querySelector(".price-discount");
            const productImg = productElement.querySelector(".product img");

            // Ya no se maneja la talla
            if (!productTitle || !productPrice || !productImg) {
                console.error("Producto no encontrado en la página");
                return;
            }

            // Agregar a la wishlist
            if (wishlist.some((product) => product.productId === productId)) {
                eliminarDeWishlist(productId);
                icon.src = "./assets/corazon_vacio.ico";
            } else {
                agregarAlWishlist(productId, productTitle.textContent, productPrice.textContent, productImg.src);
                icon.src = "./assets/corazon_lleno.ico";
            }
        });
    });

    wishlist.forEach((product) => {
        const icon = document.querySelector(`[data-product-id="${product.productId}"] .wishlist-icon`);
        if (icon) {
            icon.src = "./assets/corazon_lleno.ico";
        }
    });

    function updateHeartIcon(productId, action) {
        const icon = document.querySelector(`[data-product-id="${productId}"] .wishlist-icon`);
        if (icon) {
            if (action === "lleno") {
                icon.src = "./assets/corazon_lleno.ico";
            } else if (action === "vacío") {
                icon.src = "./assets/corazon_vacio.ico";
            }
        }
    }
});
