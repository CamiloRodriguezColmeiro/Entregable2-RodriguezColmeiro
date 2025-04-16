const burgas = [
    {
      nombre: "Hamburguesa de Cheddar y Bacon Simple",
      precio: 6000,
      imagen: "../multimedia/menu/CheddarBacon.jpg",
      id : 1
    },
    {
      nombre: "Hamburguesa de Cheddar y Bacon Doble",
      precio: 7200,
      imagen: "../multimedia/menu/DobleCheddarBacon.jpg",
      id : 2
    },
    {
      nombre: "Hamburguesa de Cheddar y Bacon Triple",
      precio: 8400,
      imagen: "../multimedia/menu/TripleCheddarBacon.jpg", 
      id : 3
    },
  ];
const papas = [
    {
      nombre: "Papas Fritas",
      precio: 2000,
      imagen: "../multimedia/menu/PapasNormales.jpg",
      id : 4 
    },
    {
      nombre: "Papas Fritas con Cheddar y Bacon",
      precio: 3000,
      imagen: "../multimedia/menu/PapasCheddarBacon.jpg",
      id: 5
    },
    {
      nombre: "Papas Fritas con Salsa BBQ",
      precio: 3500,
      imagen: "../multimedia/menu/PapasSalsaBBQ.jpg",
      id : 6
    },
  ];
const bebidas = [
    {
      nombre: "Pepsi",
      precio: 1500,
      imagen: "../multimedia/menu/Pepsi.jpg",
      id : 7
    },
    {
      nombre: "Sprite",
      precio: 1500,
      imagen: "../multimedia/menu/Limon.jpg",
      id : 8
    },
    {
      nombre: "Fanta",
      precio: 1500,
      imagen: "../multimedia/menu/naranja.jpg",
      id : 9
    },
  ];
let carritoProductos = JSON.parse(localStorage.getItem('carrito')) || [];
function imprimirProductosEnArticulos(productos, nombreContenedor) {
    const contenedor = document.getElementById(nombreContenedor);
	for (const producto of productos) {
		const card = document.createElement("div");
        card.classList.add("col-sm-12", "col-md-6", "col-lg-3", "m-5", "border", "border-black", "p-3", "bgd-brown", "aparecer");
		card.innerHTML = `
					<img src="${producto.imagen}" alt="${producto.nombre}" />
					<p class="fs-5 roboto-mono">${producto.nombre}</p>
                    <p class="fs-5 roboto-mono">Precio: ${producto.precio}</p>
					<button id="${producto.id}">Agregar Al Carrito</button>
		`;
		contenedor.appendChild(card);
		const boton = document.getElementById(`${producto.id}`);
		boton.classList.add("btn", "btn-danger", "bgd");
		boton.addEventListener("click", () => agregarAlCarrito(producto));
	}
}
function agregarAlCarrito(producto){
    carritoProductos.push(producto);
    localStorage.setItem('carrito', JSON.stringify(carritoProductos));
}
function actualizarCarritoEnPantalla(pago) {
  const contenedor = document.getElementById("carritoArticulos");
  contenedor.innerHTML = ""; 
  if (carritoProductos.length === 0 && pago === 1){
    contenedor.innerHTML = "<p class='text-center'>Gracias por su compra.</p>";
    return;
  }
  if (carritoProductos.length === 0) {
      contenedor.innerHTML = "<p class='text-center'>Tu carrito está vacío.</p>";
      return;
  }
  let precioTotal = 0;
  let id = 0;
  for (const producto of carritoProductos) {
      id++;
      const card = document.createElement("div");
      card.classList.add("col-sm-12", "col-md-6", "col-lg-3", "m-5", "border", "border-black", "p-3", "bgd-brown");
      card.innerHTML = `
          <p class="fs-5 roboto-mono">${producto.nombre}</p>
          <p class="fs-5 roboto-mono">Precio: ${producto.precio}</p>
          <button id="${id}">Remover del Carrito</button>
      `;
      precioTotal += producto.precio
      contenedor.appendChild(card);
      const boton = document.getElementById(`${id}`);
      boton.classList.add("btn", "btn-danger", "bgd");
      boton.addEventListener("click", () => removerDelCarrito(producto));
  }
  if (precioTotal > 0) {
    const total = document.createElement("p");
    const botonPagar = document.createElement("button");
    total.classList.add("fs-5", "roboto-mono", "ms-5");
    botonPagar.classList.add("btn", "btn-danger", "bgd", "ms-5");
    botonPagar.textContent = `Pagar`;
    total.textContent = `Precio total del Pedido: ${precioTotal}`;
    contenedor.appendChild(total);
    contenedor.appendChild(botonPagar);
    botonPagar.addEventListener("click", () => pagado())
  }
}
function removerDelCarrito(producto) {
  const index = carritoProductos.findIndex(p => p.id === producto.id);
  if (index !== -1) {
      carritoProductos.splice(index, 1);
      localStorage.setItem('carrito', JSON.stringify(carritoProductos));
      actualizarCarritoEnPantalla(0);
  }
}
function pagado(){
  localStorage.removeItem('carrito');
  carritoProductos.length = 0;
  actualizarCarritoEnPantalla(1);
}
if (location.pathname.endsWith("menu.html")){
    imprimirProductosEnArticulos(burgas, "burgas-container")
    imprimirProductosEnArticulos(papas, "papas-container")
    imprimirProductosEnArticulos(bebidas, "bebidas-container")
}
if (location.pathname.endsWith("carrito.html")){
    actualizarCarritoEnPantalla(0)
}