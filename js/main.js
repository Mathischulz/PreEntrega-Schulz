//! Array de los productos
document.addEventListener("DOMContentLoaded", function() {
    const carritoProductos = document.getElementById("carrito-productos");
    const carritoTotal = document.getElementById("carrito-total");
    const productos = [
        { 
            id: 1, 
            nombre: "Iphone 15", 
            precio: 1000, 
            imagen: "./img/iphone15.png" 
        },
        { 
            id: 2, 
            nombre: "Iphone 14", 
            precio: 900, 
            imagen: "./img/14promax.png" 
        },
        { 
            id: 3, 
            nombre: "Iphone 13", 
            precio: 800, 
            imagen: "./img/iphone13.png" 
        },
        { 
            id: 4, 
            nombre: "Iphone 12", 
            precio: 700, 
            imagen: "./img/iphone12.png" 
        }
    ];

    const productosDiv = document.getElementById("productos");

    //! Genero dinámicamente los elementos HTML de los productos
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

    //! Agregar evento click a cada botón de "Comprar ahora"
    const botonesComprar = document.querySelectorAll(".producto-boton");
    botonesComprar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito);
    });

    //! Función para cargar el carrito desde localStorage
    mostrarCarrito();
});
