//! Nombre usuario para que no pueda avanzar si escribe " " o un número // 
let nombreUsuario = "";

while(nombreUsuario.trim() === "" || !isNaN(nombreUsuario.trim())) {
    nombreUsuario = prompt("Ingrese su nombre");
    if (nombreUsuario.trim() === "" || !isNaN(nombreUsuario.trim())) {
        alert("No ingresaste ningún nombre, intente de nuevo.")
    } else {
        alert ("Hola " + nombreUsuario + ", Bienvenido!")
    }
}
console.log(nombreUsuario)


//! Función para obtener el precio de un producto seleccionado //
function obtenerPrecio(productoSeleccionado) {
    let precio;
    
    //! Asigno los precios //
    switch (productoSeleccionado) {
        case '1':
            precio = 1000;
            break;
        case '2':
            precio = 900;
            break;
        case '3':
            precio = 800;
            break;
        case '4':
            precio = 700;
            break;
        default:
            precio = null; //! Si el producto no es valido, se asigna null al precio //
            break;
    }
    
    return precio;
}

 //! Asigno variable para almacenar el precio total de la compra //
let totalCompra = 0;

//! Ciclo para que el usuario elija el producto o desee salir //
while (true) {
    let productoSeleccionado = prompt(
        "Estos son nuestros productos:\n\n" +
        "1- Iphone 15: $1000\n" +
        "2- Iphone 14 Pro Max: $900\n" +
        "3- Iphone 13: $800\n" +
        "4- Iphone 12: $700\n\n" +
        "Ingrese el número del producto que desea comprar (1, 2, 3 o 4), o escriba 'x' para salir:");

    if (productoSeleccionado === 'x') {
        break;  //! Si el usuario ingresa x, sale del ciclo //
    }

    let precioSeleccionado = obtenerPrecio(productoSeleccionado);

    if (precioSeleccionado < 4 ) {
        alert("Por favor, ingrese un número de producto válido (1, 2, 3 o 4).");
    } else {
        totalCompra += precioSeleccionado; //! Se suma el precio del producto al total de la compra //
        alert("El precio del producto es: $" + precioSeleccionado + " y fue agregado al carrito de compra.");
        console.log("El precio del producto es: $" + precioSeleccionado);
    }
}

//! Si se realiza una compra muestro un alert del precio total //
if (totalCompra > 0) {
    alert("El precio total de su compra es: $" + totalCompra + ". ¡Gracias por su compra!");
    console.log("El precio total de su compra es: $" + totalCompra + ". ¡Gracias por su compra!");
} else { //! Si no realiza ninguna compra muestro alert de hasta luego //
    alert("No ha realizado ninguna compra. ¡Hasta luego!");
    console.log("No ha realizado ninguna compra. ¡Hasta luego!");
}


//! ARRAY de los productos //
const productos = [
    {
        titulo: "Iphone 15",
        precio: 1000
    },
    {
        titulo: "Iphone 14",
        precio: 900
    },
    {
        titulo: "Iphone 13",
        precio: 800
    },
    {
        titulo: "Iphone 12",
        precio: 700
    }
]
console.log(productos)

productos.forEach(producto => {
    console.log("Producto: " + producto.titulo + ", Precio: " + producto.precio);
});
