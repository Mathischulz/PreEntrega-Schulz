//! Saludo al usuario y obtengo su nombre //
let nombreUsuario = obtenerNombreUsuario();

//! Función para obtener el nombre de usuario válido //
function obtenerNombreUsuario() {
    let nombreUsuario;
    do {
        nombreUsuario = prompt("Ingrese su nombre").trim();
        if (nombreUsuario === "") {
            alert("No ingresaste ningún nombre, intente de nuevo.");
        } else {
            alert("Hola " + nombreUsuario + ", Bienvenido!");
        }
    } while (nombreUsuario === "");
    console.log(nombreUsuario);
    return nombreUsuario;
}

//! Función para obtener el precio de un producto seleccionado //
function obtenerPrecio(productoSeleccionado, productos) {
    let producto = productos.find(item => item.numero === productoSeleccionado);
    return producto ? producto.precio : null;
}

//! ARRAY de los productos //
const productos = [
    {
        numero: '1',
        titulo: "Iphone 15",
        precio: 1000
    },
    {
        numero: '2',
        titulo: "Iphone 14 Pro Max",
        precio: 900
    },
    {
        numero: '3',
        titulo: "Iphone 13",
        precio: 800
    },
    {
        numero: '4',
        titulo: "Iphone 12",
        precio: 700
    }
];
console.log(productos)

//! Mostrar los productos al usuario utilizando forEach
let listaProductos = "Estos son nuestros productos:\n\n";
productos.forEach(producto => {
    listaProductos += producto.numero + "- " + producto.titulo + ": $" + producto.precio + "\n";
});
listaProductos += "\nIngrese el número del producto que desea comprar (1, 2, 3 o 4), o escriba 'x' para salir:";
let seguirComprando;


//! Asigno variable para almacenar el precio total de la compra //
let totalCompra = 0;


//! Ciclo para que el usuario elija el producto o desee salir //
do {
    let productoSeleccionado = prompt(listaProductos);

    if (productoSeleccionado === 'x') {
        seguirComprando = false;  
    } else {
        seguirComprando = true; 

        let precioSeleccionado = obtenerPrecio(productoSeleccionado, productos); 

        if (!precioSeleccionado) {
            alert("Por favor, ingrese un número de producto válido (1, 2, 3 o 4).");
        } else {
            totalCompra += precioSeleccionado; 
            alert("El precio del producto es: $" + precioSeleccionado + " y fue agregado al carrito de compra.");
            console.log("El precio del producto agregado al carrito es: $" + precioSeleccionado);
        }
    }
} while (seguirComprando);

//! Mostrar el mensaje apropiado dependiendo de si se realizó alguna compra
if (totalCompra > 0) {
    alert(nombreUsuario + ", el precio total de su compra es: $" + totalCompra + ". ¡Gracias por su compra!");
    console.log("El precio total de la compra de " + nombreUsuario + " es: $" + totalCompra);
} else {
    alert("No ha realizado ninguna compra. ¡Hasta luego, " + nombreUsuario + "!");
    console.log("No ha realizado ninguna compra. ¡Hasta luego, " + nombreUsuario + "!");
}

