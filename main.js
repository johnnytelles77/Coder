function Producto(nombre, precio, stock) {
    this.nombre = nombre;
    this.precio = precio;
    this.stock = stock;
}

let lista = [];

// Si hay algo en localStorage, lo cargamos a la lista
if (localStorage.getItem("productos")) {
    lista = JSON.parse(localStorage.getItem("productos"));
}

const outputContainer = document.getElementById("outputContainer");

// Función para filtrar productos
function filtrarProductos() {
    limpiarOutput(outputContainer);

    const input = document.getElementById("filtrarP").value.trim().toUpperCase();
    const palabraClave = input.trim().toUpperCase();
    const resultado = lista.filter(producto => producto.nombre.toUpperCase().includes(palabraClave));

    if (resultado.length > 0) {
        resultado.forEach(producto => {
            const card = crearCard(producto);
            outputContainer.appendChild(card);
        });
    } else {
        mostrarMensaje("No hay coincidencias. ¿Desea agregar este producto al inventario?");
        mostrarOpcionAgregar(palabraClave);
    }
}

// Función para agregar productos
function agregarProducto() {
    const form = crearFormulario();

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const nombreInput = document.getElementById("nombre-input").value.trim();
        const precioInput = parseFloat(document.getElementById("precio-input").value);
        const stockInput = parseInt(document.getElementById("stock-input").value);

        if (isNaN(precioInput) || isNaN(stockInput) || nombreInput === "") {
            mostrarMensaje("Por favor, ingresa valores válidos.");
            return;
        }

        const nuevoProducto = new Producto(nombreInput, precioInput, stockInput);

        if (productoExistente(nuevoProducto)) {
            mostrarMensaje("El producto ya existe");
            return;
        }

        lista.push(nuevoProducto);
        localStorage.setItem("productos", JSON.stringify(lista));
        mostrarMensaje(`Se agregó el producto ${nuevoProducto.nombre} a la lista`);

        const card = crearCard(nuevoProducto);
        outputContainer.appendChild(card);

        form.reset();
    });

    const body = document.querySelector("body");
    body.appendChild(form);
}

// Función para mostrar un mensaje en el contenedor de salida
function mostrarMensaje(mensaje) {
    limpiarOutput(outputContainer);
    const mensajeElement = document.createElement("p");
    mensajeElement.textContent = mensaje;
    outputContainer.appendChild(mensajeElement);
}

// Función para mostrar la opción de agregar
function mostrarOpcionAgregar(nombreProducto) {
    const agregarOpcion = document.createElement("button");
    agregarOpcion.textContent = `Agregar ${nombreProducto} al inventario`;
    agregarOpcion.addEventListener("click", function () {
        agregarProductoAlInventario(nombreProducto);
    });
    outputContainer.appendChild(agregarOpcion);
}

// Función para agregar producto al inventario
function agregarProductoAlInventario(nombreProducto) {
    const precio = parseFloat(prompt(`Ingrese el precio para ${nombreProducto}:`));
    const stock = parseInt(prompt(`Ingrese el stock para ${nombreProducto}:`));

    if (!isNaN(precio) && !isNaN(stock)) {
        const nuevoProducto = new Producto(nombreProducto, precio, stock);
        lista.push(nuevoProducto);
        localStorage.setItem("productos", JSON.stringify(lista));
        mostrarMensaje(`Se agregó el producto ${nombreProducto} al inventario`);
        const card = crearCard(nuevoProducto);
        outputContainer.appendChild(card);
    } else {
        mostrarMensaje("Ingrese datos válidos para precio y stock.");
    }
}

// Función para crear una card de producto
function crearCard(producto) {
    const card = document.createElement("div");
    card.classList.add("container");

    const nombre = document.createElement("h2");
    nombre.textContent = `Nombre: ${producto.nombre}`;
    card.appendChild(nombre);

    const precio = document.createElement("p");
    precio.textContent = `Precio: ${producto.precio}`;
    card.appendChild(precio);

    const stock = document.createElement("p");
    stock.textContent = `Cantidad: ${producto.stock}`;
    card.appendChild(stock);

    return card;
}

// Función para crear el formulario de agregar producto
function crearFormulario() {
    const form = document.createElement("form");

    form.innerHTML = `
        <label for="nombre-input">Nombre:</label>
        <input id="nombre-input" type="text" required>
        
        <label for="precio-input">Precio:</label>
        <input id="precio-input" type="number" step="0.01" required>

        <label for="stock-input">Stock:</label>
        <input id="stock-input" type="number" required>

        <button type="submit">Agregar</button>
    `;

    return form;
}

// Función para verificar si un producto ya existe en la lista
function productoExistente(producto) {
    return lista.some(elemento => elemento.nombre === producto.nombre);
}

// Función para limpiar el contenido de un contenedor
function limpiarOutput(container) {
    container.innerHTML = "";
}

// Eventos de los botones
document.getElementById("agregarProducto").addEventListener("click", agregarProducto);
document.getElementById("filtrar").addEventListener("click", filtrarProductos);
