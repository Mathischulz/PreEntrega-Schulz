// //! Saludo al usuario y obtengo su nombre //
// let nombreUsuario = obtenerNombreUsuario();

// //! Función para obtener el nombre de usuario válido //
// function obtenerNombreUsuario() {
//     let nombreUsuario;
//     do {
//         nombreUsuario = prompt("Ingrese su nombre").trim();
//         if (nombreUsuario === "") {
//             alert("No ingresaste ningún nombre, intente de nuevo.");
//         } else {
//             alert("Hola " + nombreUsuario + ", Bienvenido!");
//         }
//     } while (nombreUsuario === "");
//     console.log(nombreUsuario);
//     return nombreUsuario;
// }

// //! Función para obtener el precio de un producto seleccionado //
// function obtenerPrecio(productoSeleccionado, productos) {
//     let producto = productos.find(item => item.numero === productoSeleccionado);
//     return producto ? producto.precio : null;
// }

// //! ARRAY de los productos //
// const productos = [
//     {
//         numero: '1',
//         titulo: "Iphone 15",
//         precio: 1000
//     },
//     {
//         numero: '2',
//         titulo: "Iphone 14 Pro Max",
//         precio: 900
//     },
//     {
//         numero: '3',
//         titulo: "Iphone 13",
//         precio: 800
//     },
//     {
//         numero: '4',
//         titulo: "Iphone 12",
//         precio: 700
//     }
// ];
// console.log(productos)

// //! Mostrar los productos al usuario utilizando forEach
// let listaProductos = "Estos son nuestros productos:\n\n";
// productos.forEach(producto => {
//     listaProductos += producto.numero + "- " + producto.titulo + ": $" + producto.precio + "\n";
// });
// listaProductos += "\nIngrese el número del producto que desea comprar (1, 2, 3 o 4), o escriba 'x' para salir:";
// let seguirComprando;


// //! Asigno variable para almacenar el precio total de la compra //
// let totalCompra = 0;


// //! Ciclo para que el usuario elija el producto o desee salir //
// do {
//     let productoSeleccionado = prompt(listaProductos);

//     if (productoSeleccionado === 'x') {
//         seguirComprando = false;  
//     } else {
//         seguirComprando = true; 

//         let precioSeleccionado = obtenerPrecio(productoSeleccionado, productos); 

//         if (!precioSeleccionado) {
//             alert("Por favor, ingrese un número de producto válido (1, 2, 3 o 4).");
//         } else {
//             totalCompra += precioSeleccionado; 
//             alert("El precio del producto es: $" + precioSeleccionado + " y fue agregado al carrito de compra.");
//             console.log("El precio del producto agregado al carrito es: $" + precioSeleccionado);
//         }
//     }
// } while (seguirComprando);

// //! Mostrar el mensaje apropiado dependiendo de si se realizó alguna compra
// if (totalCompra > 0) {
//     alert(nombreUsuario + ", el precio total de su compra es: $" + totalCompra + ". ¡Gracias por su compra!");
//     console.log("El precio total de la compra de " + nombreUsuario + " es: $" + totalCompra);
// } else {
//     alert("No ha realizado ninguna compra. ¡Hasta luego, " + nombreUsuario + "!");
//     console.log("No ha realizado ninguna compra. ¡Hasta luego, " + nombreUsuario + "!");
// }

document.addEventListener("DOMContentLoaded", function() {
    const carritoProductos = document.getElementById("carrito-productos");
    const carritoTotal = document.getElementById("carrito-total");

    let productos = [];

    const productosDiv = document.getElementById("productos");

    //! Función para agregar producto al carrito
    function agregarAlCarrito(event) {
        const id = parseInt(event.target.dataset.id);
        const producto = productos.find(p => p.id === id);
        if (producto) {
            let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
            carrito.push(producto);
            localStorage.setItem("carrito", JSON.stringify(carrito));
            mostrarCarrito();
        }

        Toastify({
            text: "Producto agregado",
            gravity: "bottom",
            style: {
                background: "linear-gradient(to right, #00b09b, #96c93d)",
            }
        }).showToast();
    }

    //! Función para mostrar los productos del carrito
    function mostrarCarrito() {
        carritoProductos.innerHTML = "";
        let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
        if (carrito.length === 0) {
            carritoProductos.innerHTML = '<div id="carrito-vacio"><h2>El carrito está vacío.</h2></div>';
        } else {
            carrito.forEach((producto, index) => {
                const div = document.createElement("div");
                div.classList.add("carrito-producto");
                div.innerHTML = `
                    <h2>${producto.nombre}</h2>
                    <p>Precio: $${producto.precio}</p>
                    <button class="carrito-producto-boton" data-index="${index}">Eliminar</button>
                `;
                carritoProductos.appendChild(div);
            });

            //! Agregar evento click a cada botón de "Eliminar"
            const botonesEliminar = document.querySelectorAll(".carrito-producto-boton");
            botonesEliminar.forEach(boton => {
                boton.addEventListener("click", eliminarDelCarrito);
            });
        }
        calcularTotal();
    }

    //! Función para eliminar un producto del carrito
    function eliminarDelCarrito(event) {
        const index = parseInt(event.target.dataset.index);
        let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
        carrito.splice(index, 1);
        localStorage.setItem("carrito", JSON.stringify(carrito));
        mostrarCarrito();
    }

    //! Función para calcular el total del carrito
    function calcularTotal() {
        let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
        let total = carrito.reduce((acc, producto) => acc + producto.precio, 0);
        carritoTotal.textContent = `$${total}`;
    }

    //! Función para finalizar la compra
    const btnFinalizarCompra = document.getElementById("finalizar-compra");
    btnFinalizarCompra.addEventListener("click", finalizarCompra);

    function finalizarCompra() {
        const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
        if (carrito.length === 0) {
            Swal.fire({
                icon: "error",
                title: "No hay productos en el carrito",
                text: "Intenta agregar algún Iphone que quieras comprar!",
            });
            return;
        }
        
        Swal.fire({
            title: "¿Desea confirmar la compra?",
            icon:"question",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Confirmar"
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: "Gracias por tu compra!",
                    text: "El Iphone te llegará a domicilio.",
                    imageUrl: "../img/perritocontento.png"
                });
            }
        });
    }

    //! ---------- FETCH para cargar productos desde un archivo JSON ---------- //
    fetch("/data/productos.json")
        .then(res => res.json())
        .then(data => {
            productos = data;
            mostrarProductos(); //! Llamamos a mostrarProductos después de cargar los productos
        })
        .catch(error => {
            console.error('Error al cargar productos:', error);
        });

    //! Función para generar dinámicamente los elementos HTML de los productos
    const mostrarProductos = () => {
        productos.forEach(producto => {
            const productoDiv = document.createElement("div");
            productoDiv.classList.add("producto");
            productoDiv.innerHTML = `
                <h2>${producto.nombre}</h2>
                <img src="${producto.imagen}" alt="${producto.nombre}">
                <p>$${producto.precio}</p>
                <button class="producto-boton" data-id="${producto.id}">Comprar ahora</button>
            `;
            productosDiv.appendChild(productoDiv);
        });

        //! Agregar evento click a cada botón de "Comprar ahora"
        const botonesComprar = document.querySelectorAll(".producto-boton");
        botonesComprar.forEach(boton => {
            boton.addEventListener("click", agregarAlCarrito);
        });
    };

    //! Función para cargar el carrito desde localStorage
    mostrarCarrito();

});





//! ---------- COLOR MODE ---------- //
const body = document.body;

let modoColorLS = localStorage.getItem("modo-color");
if (modoColorLS === "modo-oscuro") {
    body.classList.add("modo-oscuro");
}
const btnModoColor = document.querySelector("#modo-color");

btnModoColor.addEventListener("click", () => {
    body.classList.toggle("modo-oscuro");

    if (body.classList.contains("modo-oscuro")) {
        localStorage.setItem("modo-color", "modo-oscuro");
    } else {
        localStorage.removeItem("modo-color");
    }
});
