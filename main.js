function Producto(nombre, precio, categoria) {
    this.nombre = nombre;
    this.precio = precio;
    this.categoria = categoria;
}

let inventario = [];
let carrito = [];

function agregarProductoAlInventario() {
    let nombre = prompt("Ingrese el nombre del producto:");
    let precio = parseFloat(prompt("Ingrese el precio del producto:"));
    let categoria = prompt("Ingrese la categoría del producto (New + Best Sellers, Face, Eyes, Lips):");

    if (!isNaN(precio) && nombre && categoriaValida(categoria)) {
        let producto = new Producto(nombre, precio, categoria);
        inventario.push(producto);
        alert("Producto agregado al inventario correctamente.");
    } else {
        alert("Ingrese datos válidos.");
    }
}

function categoriaValida(categoria) {
    const categoriasPermitidas = ['New + Best Sellers', 'Face', 'Eyes', 'Lips'];
    return categoriasPermitidas.includes(categoria);
}

function mostrarInventario() {
    console.log("Inventario de productos:");
    inventario.forEach(producto => {
        console.log(`${producto.nombre} - $${producto.precio} - Categoría: ${producto.categoria}`);
    });
}

function mostrarProductosPorCategoria() {
    let categoriaSeleccionada = prompt("Ingrese la categoría que desea ver (New + Best Sellers, Face, Eyes, Lips):");
    if (categoriaValida(categoriaSeleccionada)) {
        let productosFiltrados = inventario.filter(producto => producto.categoria.toLowerCase() === categoriaSeleccionada.toLowerCase());

        if (productosFiltrados.length > 0) {
            console.log(`Productos en la categoría ${categoriaSeleccionada}:`);
            productosFiltrados.forEach(producto => {
                console.log(`${producto.nombre} - $${producto.precio}`);
            });
        } else {
            console.log(`No hay productos en la categoría ${categoriaSeleccionada}.`);
        }
    } else {
        alert("Categoría no válida. Por favor, elija una categoría válida.");
    }
}

function verStock() {
    console.log("Productos en stock:");
    if (inventario.length > 0) {
        inventario.forEach(producto => {
            console.log(`${producto.nombre} - $${producto.precio} - Categoría: ${producto.categoria}`);
        });
    } else {
        console.log("El inventario está vacío.");
    }
}

agregarProductoAlInventario();
agregarProductoAlInventario();
verStock();
mostrarProductosPorCategoria();
