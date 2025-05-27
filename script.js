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

// FORMULARIO DE SUSCRIPCIÓN
const formulario = document.getElementById('formulario-suscripcion');
const modal = document.getElementById('modal-confirmacion');
const fondo = document.getElementById('fondo-modal');
const cerrar = document.getElementById('cerrar-modal');

const categoria = document.getElementById('categoria');
const subcategoriaContenedor = document.getElementById('subcategoria-contenedor');
const subcategoria = document.getElementById('subcategoria');

// Opciones de subcategorías por categoría
const opciones = {
  mujer: ['Camisas y blusas', 'Vestidos', 'Faldas', 'Pantalones'],
  hombre: ['Polos', 'Bermudas', 'Camisas y camisetas', 'Pantalones'],
  kid: ['Camisas y pantalones', 'Ropa para niña', 'Bebés', 'Conjuntos'],
  accesorios: ['Gorras', 'Cinturones', 'Bolsos', 'Gafas', 'Carteras']
};

// Mostrar subcategorías al elegir categoría
categoria.addEventListener('change', () => {
  const seleccion = categoria.value;
  subcategoria.innerHTML = ''; // Limpiar anteriores

  if (opciones[seleccion]) {
    subcategoriaContenedor.style.display = 'block';
    opciones[seleccion].forEach(op => {
      const option = document.createElement('option');
      option.value = op.toLowerCase();
      option.textContent = op;
      subcategoria.appendChild(option);
    });
  } else {
    subcategoriaContenedor.style.display = 'none';
  }
});

// Mostrar modal al enviar formulario
formulario.addEventListener('submit', function(event) {
  event.preventDefault(); // Previene recarga
  modal.style.display = 'block';
  fondo.style.display = 'block';
  formulario.reset(); // Limpia campos
  subcategoriaContenedor.style.display = 'none'; // Oculta subcategorías
});

// Cerrar modal
cerrar.addEventListener('click', function() {
  modal.style.display = 'none';
  fondo.style.display = 'none';
});

fondo.addEventListener('click', function() {
  modal.style.display = 'none';
  fondo.style.display = 'none';
});

// Función para aplicar filtros
function applyFilters() {
    const category = document.getElementById('category-filter').value;
    const selectedSize = document.getElementById('size-filter').value;
    const minPrice = document.getElementById('price-min').value ? parseFloat(document.getElementById('price-min').value) : 0;
    const maxPrice = document.getElementById('price-max').value ? parseFloat(document.getElementById('price-max').value) : Infinity;

    // Obtener todos los productos
    const products = document.querySelectorAll('.hotsales');
    const filteredContainer = document.getElementById('filtered-products');
    const originalSections = document.getElementById('original-sections');
    
    // Variable para verificar si hay algún filtro activo
    const hasActiveFilters = category || selectedSize || minPrice > 0 || maxPrice !== Infinity;

    if (hasActiveFilters) {
        // Limpiar el contenedor de productos filtrados
        filteredContainer.innerHTML = '';
        
        // Ocultar las secciones originales
        originalSections.style.display = 'none';
        
        // Mostrar el contenedor de productos filtrados
        filteredContainer.style.display = 'grid';

        // Filtrar y mostrar productos
        products.forEach(product => {
            // Verificar precio
            const priceElement = product.querySelector('.price-discount');
            if (!priceElement) return;
            
            // Extraer el precio como número
            const priceText = priceElement.textContent.replace(/[^\d]/g, '');
            const price = parseInt(priceText, 10);

            // Verificar si el precio está dentro del rango
            const matchesPrice = price >= minPrice && (maxPrice === Infinity || price <= maxPrice);
            
            // Verificar talla
            const sizeElements = product.querySelectorAll('.size-letter');
            const matchesSize = !selectedSize || Array.from(sizeElements).some(el => el.textContent === selectedSize);
            
            // Verificar categoría
            const productSection = product.closest('article');
            if (!productSection) return;
            
            const matchesCategory = !category || 
                (category === 'mujer' && productSection.id === 'sales-mujer') ||
                (category === 'hombre' && productSection.id === 'sales-hombre') ||
                (category === 'kid' && productSection.id === 'sales-kid') ||
                (category === 'accesorios' && productSection.id === 'sale-accesorios');

            // Si el producto coincide con todos los filtros, clonarlo y agregarlo al contenedor
            if (matchesPrice && matchesCategory && matchesSize) {
                const productClone = product.cloneNode(true);
                filteredContainer.appendChild(productClone);
            }
        });

        // Si no hay productos que coincidan con los filtros, mostrar un mensaje
        if (filteredContainer.children.length === 0) {
            filteredContainer.innerHTML = '<div class="no-results">No se encontraron productos que coincidan con los filtros seleccionados.</div>';
        }
    } else {
        // Si no hay filtros activos, mostrar las secciones originales
        filteredContainer.style.display = 'none';
        originalSections.style.display = 'block';
    }

    // Reinicializar la selección de tallas para los productos clonados
    initializeSizeSelection();
}

// Configurar event listeners para los filtros
document.addEventListener('DOMContentLoaded', () => {
    // Event listeners para filtros
    const filterInputs = [
        document.getElementById('category-filter'),
        document.getElementById('size-filter'),
        document.getElementById('price-min'),
        document.getElementById('price-max')
    ];

    filterInputs.forEach(input => {
        if (input) {
            input.addEventListener('change', applyFilters);
            input.addEventListener('input', applyFilters);
        }
    });

    // Cargar productos inicialmente
    loadAndDisplayProducts();
});

// Función para cargar y mostrar productos
async function loadAndDisplayProducts() {
    try {
        const response = await fetch('products.json');
        const data = await response.json();
        const products = data.products;

        // Agrupar productos por categoría
        const productsByCategory = {
            'mujer': products.filter(p => p.categoria === 'mujer'),
            'hombre': products.filter(p => p.categoria === 'hombre'),
            'kid': products.filter(p => p.categoria === 'niño'),
            'accesorios': products.filter(p => p.categoria === 'accesorios')
        };

        // Mostrar productos en cada sección
        Object.entries(productsByCategory).forEach(([category, categoryProducts]) => {
            const containerId = category === 'kid' ? 'sales-kid' : 
                              category === 'accesorios' ? 'sale-accesorios' : 
                              `sales-${category}`;
            
            const container = document.getElementById(containerId);
            
            if (container) {
                container.innerHTML = categoryProducts.map(product => renderProduct(product)).join('');
            }
        });

        // Inicializar selección de tallas
        initializeSizeSelection();

    } catch (error) {
        console.error('Error al cargar los productos:', error);
    }
}

// Función para renderizar productos
function renderProduct(product) {
    // Debug: Verificar el producto que se está renderizando
    console.log('Renderizando producto:', product);

    // Asegurarse de que los precios sean números
    const precioNormal = typeof product.precio_normal === 'number' ? product.precio_normal : parseFloat(product.precio_normal);
    const precioDescuento = typeof product.precio_descuento === 'number' ? product.precio_descuento : parseFloat(product.precio_descuento);

    return `
        <div class="hotsales" id="${product.id}" data-category="${product.categoria}">
            <div class="percentage-product">
                ${product.descuento ? `<div class="percentage">${product.descuento}%</div>` : ''}
                <div class="product">
                    <img src="${product.imagen_normal}" alt="${product.nombre}" class="img-normal">
                    <img src="${product.imagen_hover || product.imagen_normal}" alt="${product.nombre}" class="img-hover">
                </div>
                ${product.stock <= 5 ? '<div class="stock">¡Últimas unidades disponibles!</div>' : ''}
            </div>
            <div class="info-product">
                <h2 class="product-title">${product.nombre}</h2>
                <span class="price-discount">$${precioDescuento.toLocaleString()}</span>
                ${product.descuento ? `<span class="regular-price">$${precioNormal.toLocaleString()}</span>` : ''}
                
                <button class="wishlist-button" data-product-id="${product.id}">
                  <svg alt="Wishlist Icon" class="wishlist-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572" />
                  </svg>
                </button>

                <div class="addCart-size">
                    ${Array.isArray(product.tallas) && product.tallas.length > 0 ? `
                        <div class="size">
                            <ul class="list-size">
                                ${product.tallas.map((talla, index) => `
                                    <li class="size-letter ${index === 0 ? 'selected' : ''}">${talla}</li>
                                `).join('')}
                            </ul>
                        </div>
                    ` : ''}
                    <button class="add-to-cart">Agregar al carrito</button>
                    <input type="hidden" name="id-product" value="${product.id}">
                </div>
            </div>
        </div>
    `;
}

// Función para inicializar la selección de tallas
function initializeSizeSelection() {
    const sizeContainers = document.querySelectorAll('.size');
    
    sizeContainers.forEach(container => {
        const sizeLetters = container.querySelectorAll('.size-letter');
        
        sizeLetters.forEach(letter => {
            letter.addEventListener('click', () => {
                // Remover la clase 'selected' de todas las tallas en el mismo contenedor
                sizeLetters.forEach(l => l.classList.remove('selected'));
                // Agregar la clase 'selected' a la talla clickeada
                letter.classList.add('selected');
            });
        });
    });
}

// Funcionalidad del botón de búsqueda
function initializeSearch() {
    const searchBottom = document.getElementById('search-bottom');
    if (!searchBottom) return; // Si no existe el elemento, salimos

    let searchInput = null;
    let suggestionsContainer = null;
    let isSearchVisible = false;

    // Crear el contenedor de sugerencias
    function createSuggestionsContainer() {
        suggestionsContainer = document.createElement('div');
        suggestionsContainer.className = 'suggestions-container';
        searchBottom.appendChild(suggestionsContainer);
    }

    // Función para obtener el archivo JSON según la página actual
    function getJsonFile() {
        const currentPage = window.location.pathname.split('/').pop();
        switch(currentPage) {
            case 'hombre.html':
                return 'products-hombre.json';
            case 'mujer.html':
                return 'products-mujer.json';
            case 'kid.html':
                return 'products-kid.json';
            case 'accesorios.html':
                return 'products-accesorios.json';
            case 'index.html':
            case '':
            default:
                return 'products.json';
        }
    }

    // Mostrar sugerencias basadas en la búsqueda
    async function showSuggestions(searchTerm) {
        if (!suggestionsContainer) return;
        
        try {
            const jsonFile = getJsonFile();
            const response = await fetch(jsonFile);
            const data = await response.json();
            
            // Determinar si estamos en index.html o en otra página
            const isIndexPage = window.location.pathname.endsWith('index.html') || window.location.pathname.endsWith('/');
            const productos = isIndexPage ? data.products : data.productos;
            
            // Filtrar productos que coincidan con el término de búsqueda
            const matches = productos.filter(producto => 
                producto.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                producto.categoria.toLowerCase().includes(searchTerm.toLowerCase())
            );

            // Limpiar sugerencias anteriores
            suggestionsContainer.innerHTML = '';

            if (matches.length > 0) {
                matches.forEach(producto => {
                    const item = document.createElement('div');
                    item.className = 'suggestion-item';
                    
                    // Determinar la estructura de la imagen y precio según la página
                    const imagen = isIndexPage ? producto.imagen_normal : producto.imagenNormal;
                    const precio = isIndexPage ? producto.precio_descuento : producto.precio;
                    
                    item.innerHTML = `
                        <img src="${imagen}" alt="${producto.nombre}">
                        <div class="suggestion-info">
                            <span class="suggestion-name">${producto.nombre}</span>
                            <span class="suggestion-price">$${precio.toLocaleString()}</span>
                        </div>
                    `;
                    
                    // Al hacer clic en una sugerencia
                    item.addEventListener('click', () => {
                        // Ocultar el buscador y las sugerencias
                        hideSuggestions();
                        if (searchInput) {
                            searchInput.style.display = 'none';
                            searchInput.value = '';
                        }
                        isSearchVisible = false;

                        // Encontrar el producto en la página
                        const productElement = document.getElementById(producto.id);
                        if (productElement) {
                            // Hacer scroll suave hasta el producto
                            productElement.scrollIntoView({ 
                                behavior: 'smooth', 
                                block: 'center'
                            });

                            // Agregar un efecto de resaltado temporal
                            productElement.classList.add('highlight-product');
                            setTimeout(() => {
                                productElement.classList.remove('highlight-product');
                            }, 2500);
                        }
                    });

                    suggestionsContainer.appendChild(item);
                });
                suggestionsContainer.style.display = 'block';
            } else {
                suggestionsContainer.innerHTML = '<div class="no-suggestions">No se encontraron productos</div>';
                suggestionsContainer.style.display = 'block';
            }
        } catch (error) {
            console.error('Error al cargar sugerencias:', error);
            suggestionsContainer.innerHTML = '<div class="error-suggestions">Error al cargar sugerencias</div>';
            suggestionsContainer.style.display = 'block';
        }
    }

    function hideSuggestions() {
        if (suggestionsContainer) {
            suggestionsContainer.style.display = 'none';
        }
    }

    searchBottom.addEventListener('click', function(e) {
        e.preventDefault();
        
        if (!isSearchVisible) {
            // Crear el input si no existe
            if (!searchInput) {
                searchInput = document.createElement('input');
                searchInput.type = 'text';
                searchInput.placeholder = 'Buscar productos...';
                searchBottom.appendChild(searchInput);
            }
            
            // Crear el contenedor de sugerencias si no existe
            if (!suggestionsContainer) {
                createSuggestionsContainer();
            }
            
            // Mostrar el input
            searchInput.style.display = 'block';
            searchInput.focus();
            isSearchVisible = true;

            // Agregar evento input para mostrar sugerencias mientras se escribe
            searchInput.addEventListener('input', function() {
                const searchTerm = this.value.trim();
                if (searchTerm.length >= 2) {
                    showSuggestions(searchTerm);
                } else {
                    hideSuggestions();
                }
            });
        } else {
            // Ocultar el input y las sugerencias
            if (searchInput) {
                searchInput.style.display = 'none';
                searchInput.value = '';
            }
            hideSuggestions();
            isSearchVisible = false;
        }
    });

    // Cerrar la búsqueda al hacer clic fuera
    document.addEventListener('click', function(e) {
        if (isSearchVisible && !searchBottom.contains(e.target)) {
            if (searchInput) {
                searchInput.style.display = 'none';
                searchInput.value = '';
            }
            hideSuggestions();
            isSearchVisible = false;
        }
    });
}

// Inicializar la búsqueda cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', initializeSearch);

// También exportamos la función para poder llamarla desde otros scripts
window.initializeSearch = initializeSearch;
