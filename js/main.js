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
