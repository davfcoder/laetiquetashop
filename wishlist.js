document.addEventListener("DOMContentLoaded", function () {
    // Crear mensaje flotante para Wishlist (sin HTML)
    const wishlistMessage = document.createElement("div");
    wishlistMessage.id = "wishlist-message";
    wishlistMessage.textContent = "Producto añadido correctamente a la Wishlist";
    document.body.appendChild(wishlistMessage);

    function mostrarMensajeWishlist() {
        wishlistMessage.style.display = "block"; // ✅ Mostrar mensaje
        wishlistMessage.classList.add("show");

        setTimeout(() => {
            wishlistMessage.style.display = "none"; // ✅ Ocultarlo después
            wishlistMessage.classList.remove("show");
        }, 2000);
    }

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
    if (wishlistButton) {
        wishlistButton.addEventListener("click", function () {
            wishlistContainer.style.display = "block"; // Mostrar el contenedor del Wishlist
            renderWishlist(); // Mostrar los productos de la Wishlist
        });
    }

    // Cerrar el contenedor del Wishlist al hacer clic en el botón de cerrar
    const cerrarWishlist = document.getElementById("cerrar-wishlist");
    if (cerrarWishlist) {
        cerrarWishlist.addEventListener("click", function () {
            wishlistContainer.style.display = "none"; // Ocultar el contenedor del Wishlist
        });
    }

    // Cargar los productos guardados en localStorage
    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

    // Función para agregar el producto a la Wishlist
    function agregarAlWishlist(productId, productName, productPrice, productImg, productTalla, productColor) {
        if (wishlist.some((product) => product.productId === productId && product.productTalla === productTalla && product.productColor === productColor)) {
            return; // Ya existe ese producto con talla y color
        }

        wishlist.push({ productId, productName, productPrice, productImg, productTalla, productColor });
        localStorage.setItem("wishlist", JSON.stringify(wishlist));
        renderWishlist(); // Actualizar la vista
        mostrarMensajeWishlist(); // Mostrar el mensaje de éxito
    }

    // Función para eliminar un producto de la Wishlist
    function eliminarDeWishlist(productId, productTalla, productColor) {
        wishlist = wishlist.filter((product) => product.productId !== productId || product.productTalla !== productTalla || product.productColor !== productColor);
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
                    <p>Talla: ${product.productTalla}</p>
                    <p>Color: ${product.productColor}</p>
                    <button class="eliminar-wishlist" data-product-id="${product.productId}" data-product-talla="${product.productTalla}" data-product-color="${product.productColor}">Eliminar</button>
                    <button class="agregar-al-carrito-wishlist"
                            data-product-id="${product.productId}"
                            data-product-name="${product.productName}"
                            data-product-price="${product.productPrice}"
                            data-product-img="${product.productImg}"
                            data-product-talla="${product.productTalla}"
                            data-product-color="${product.productColor}">
                        Agregar al Carrito
                    </button>
                </div>
            `;
            wishlistItems.appendChild(item);

            // Lógica para eliminar el producto de la Wishlist al hacer clic en el botón eliminar
            item.querySelector(".eliminar-wishlist").addEventListener("click", function () {
                const productId = this.getAttribute("data-product-id");
                const productTalla = this.getAttribute("data-product-talla");
                const productColor = this.getAttribute("data-product-color");
                eliminarDeWishlist(productId, productTalla, productColor);  
            });

            // Lógica para agregar el producto al carrito
            item.querySelector(".agregar-al-carrito-wishlist").addEventListener("click", function () {
                const productId = this.getAttribute("data-product-id");
                const productName = this.getAttribute("data-product-name");
                const productPriceText = this.getAttribute("data-product-price");
                const productPrice = parseFloat(productPriceText.replace(/[^\d,.-]/g, '').replace('.', '').replace(',', '.'));
                const productImg = this.getAttribute("data-product-img");
                const productTalla = this.getAttribute("data-product-talla");
                const productColor = this.getAttribute("data-product-color");

                if (typeof agregarAlCarrito === 'function') {
                    agregarAlCarrito(productName, productId, productTalla, productColor, productPrice, productImg);
                    eliminarDeWishlist(productId, productTalla, productColor); // Opcional: eliminar de la wishlist al agregar al carrito
                } else {
                    console.error("La función agregarAlCarrito no está definida.");
                }
            });
        });
    }

    // Función para manejar los clics en los botones de "corazón"
    document.addEventListener('click', function(event) {
        if (event.target.closest('.wishlist-button')) {
            const button = event.target.closest('.wishlist-button');
            const icon = button.querySelector('.wishlist-icon');
            const productId = button.getAttribute('data-product-id');
            
            // Obtener el contenedor del producto
            const productContainer = button.closest('.hotsales');
            if (!productContainer) return;

            // Obtener los detalles del producto
            const productTitle = productContainer.querySelector('.product-title');
            const productPriceElement = productContainer.querySelector('.price-discount');
            const productImgElement = productContainer.querySelector('.product img');
            const productTallaElement = productContainer.querySelector('.size-letter.selected');
            const productTalla = productTallaElement ? productTallaElement.textContent : "Talla no definida";
            const productColor = "Color por definir"; // Por ahora fijo, se puede modificar si se agrega selección de color

            if (!productTitle || !productPriceElement || !productImgElement) {
                console.error("Información del producto incompleta");
                return;
            }

            const productPriceText = productPriceElement.textContent;
            const productPrice = productPriceText ? parseFloat(productPriceText.replace(/[^\d,.-]/g, '').replace('.', '').replace(',', '.')) : 0;
            const productImgSrc = productImgElement.src;
            const productName = productTitle.textContent;

            // Agregar a la wishlist
            if (wishlist.some((product) => product.productId === productId && product.productTalla === productTalla && product.productColor === productColor)) {
                eliminarDeWishlist(productId, productTalla, productColor);
                updateHeartIcon(productId, "vacío");
            } else {
                agregarAlWishlist(productId, productName, productPrice, productImgSrc, productTalla, productColor);
                updateHeartIcon(productId, "lleno");
            }
        }
    });

    wishlist.forEach((product) => {
        const icon = document.querySelector(`[data-product-id="${product.productId}"] .wishlist-icon`);
        if (icon) {
            updateHeartIcon(product.productId, "lleno", icon);
        }
    });

    function updateHeartIcon(productId, action) {
        const icon = document.querySelector(`[data-product-id="${productId}"] .wishlist-icon`);
        if (icon) {
            if (action === "lleno") {
                icon.classList.add('filled');
                icon.setAttribute('fill', 'currentColor');
            } else {
                icon.classList.remove('filled');
                icon.setAttribute('fill', 'none');
            }
        }
    }

    // Asegúrate de que la wishlist se renderice al cargar la página
    renderWishlist();
});
