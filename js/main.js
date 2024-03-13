// Precios de los productos
let precio1 = 500;
let precio2 = 1000;
let precio3 = 800;

// Función para obtener el precio del producto según su número
function obtenerPrecio(numeroProducto) {
    let precio;
    switch (numeroProducto) {
        case 1:
            precio = precio1;
            break;
        case 2:
            precio = precio2;
            break;
        case 3:
            precio = precio3;
            break;
    }
    return precio;
}

let productoSeleccionado = prompt("Ingrese el número del producto que quiere comprar (1, 2 o 3):");

// Convierto a número entero
productoSeleccionado = parseInt(productoSeleccionado);

// Obtengo el precio del producto seleccionado utilizando la función
let precioSeleccionado = obtenerPrecio(productoSeleccionado);

// Verifico si el precio obtenido es válido
if (precioSeleccionado < 4) {
    alert("Por favor, ingrese un número de producto (1, 2 o 3).");
} else {
    alert("El precio del Producto " + productoSeleccionado + " es: $" + precioSeleccionado);
    console.log("El precio es de $" + precioSeleccionado)
}


