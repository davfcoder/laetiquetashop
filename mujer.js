// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', inicializar);

// Función para cargar los productos
async function cargarProductos() {
    try {
        const response = await fetch('./products-mujer.json');
        const productos = await response.json();
        return productos;
    } catch (error) {
        console.error('Error al cargar los productos:', error);
        return [];
    }
}

// Función para crear el HTML de un producto
function crearProductoHTML(producto) {
    return `
        <div class="hotsales productos" id="${producto.id}">
            <div class="percentage-product">
                <div class="product">
                    <img src="${producto.imagenNormal}" alt="${producto.nombre}" class="img-normal">
                    <img src="${producto.imagenHover}" alt="${producto.nombre}" class="img-hover">
                </div>
            </div>
            <div class="info-product">
                <h2 class="product-title">${producto.nombre}</h2>
                <span class="price-discount price-normal">$${producto.precio.toLocaleString()}</span>

                <button class="wishlist-button" data-product-id="${producto.id}">
                    <svg alt="Wishlist Icon" class="wishlist-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572" />
                    </svg>
                </button>

                <div class="addCart-size">
                    <div class="size">
                        <ul class="list-size">
                            ${producto.tallas.map((talla, index) => `
                                <li class="size-letter ${index === 0 ? 'selected' : ''}">${talla}</li>
                            `).join('')}
                        </ul>
                    </div>
                    <button class="add-to-cart">Agregar al carrito</button>
                    <input type="hidden" name="id-product-${producto.id}" id="addCartProduct">
                </div>
            </div>
        </div>
    `;
}

// Función para mostrar los productos
function mostrarProductos(productos) {
    const contenedor = document.getElementById('original-products');
    contenedor.innerHTML = productos.map(crearProductoHTML).join('');
    initializeSizeSelection();
}

// Función para inicializar la selección de tallas
function initializeSizeSelection() {
    const sizeButtons = document.querySelectorAll('.size-letter');
    sizeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productCard = this.closest('.hotsales');
            const allSizes = productCard.querySelectorAll('.size-letter');
            allSizes.forEach(btn => btn.classList.remove('selected'));
            this.classList.add('selected');
        });
    });
}

// Función para filtrar productos
function filtrarProductos(productos, filtros) {
    return productos.filter(producto => {
        // Filtro por categoría
        if (filtros.categoria && producto.categoria !== filtros.categoria) {
            return false;
        }

        // Filtro por talla
        if (filtros.talla && !producto.tallas.includes(filtros.talla)) {
            return false;
        }

        // Filtro por precio mínimo
        if (filtros.precioMin && producto.precio < filtros.precioMin) {
            return false;
        }

        // Filtro por precio máximo
        if (filtros.precioMax && producto.precio > filtros.precioMax) {
            return false;
        }

        return true;
    });
}

// Función para actualizar la visualización de productos
function actualizarProductos(productos) {
    const contenedor = document.getElementById('original-products');
    if (productos.length === 0) {
        contenedor.innerHTML = '<p class="no-products-message">No se encontraron productos que coincidan con los filtros seleccionados.</p>';
    } else {
        contenedor.innerHTML = productos.map(crearProductoHTML).join('');
        initializeSizeSelection();
    }
}

// Función principal
async function inicializar() {
    const productos = await cargarProductos();
    actualizarProductos(productos.productos);

    // Event listeners para los filtros
    const filtros = {
        categoria: '',
        talla: '',
        precioMin: null,
        precioMax: null
    };

    document.getElementById('category-filter').addEventListener('change', (e) => {
        filtros.categoria = e.target.value;
        const productosFiltrados = filtrarProductos(productos.productos, filtros);
        actualizarProductos(productosFiltrados);
    });

    document.getElementById('size-filter').addEventListener('change', (e) => {
        filtros.talla = e.target.value;
        const productosFiltrados = filtrarProductos(productos.productos, filtros);
        actualizarProductos(productosFiltrados);
    });

    document.getElementById('price-min').addEventListener('change', (e) => {
        filtros.precioMin = e.target.value ? parseInt(e.target.value) : null;
        const productosFiltrados = filtrarProductos(productos.productos, filtros);
        actualizarProductos(productosFiltrados);
    });

    document.getElementById('price-max').addEventListener('change', (e) => {
        filtros.precioMax = e.target.value ? parseInt(e.target.value) : null;
        const productosFiltrados = filtrarProductos(productos.productos, filtros);
        actualizarProductos(productosFiltrados);
    });

    // Inicializar el buscador
    if (typeof initializeSearch === 'function') {
        initializeSearch();
    }
} 