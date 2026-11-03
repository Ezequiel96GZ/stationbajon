// Credenciales Predefinidas
const ADMIN_USER = "admin";
const ADMIN_PASS = "station123";
let isAdminLoggedIn = false;


// --- CONFIGURACIÓN DE FIREBASE ---
const firebaseConfig = {
    apiKey: "TU_API_KEY",
    authDomain: "TU_PROYECTO.firebaseapp.com",
    projectId: "TU_PROJECT_ID",
    storageBucket: "TU_PROYECTO.appspot.com",
    messagingSenderId: "TU_MESSAGING_SENDER_ID",
    appId: "TU_APP_ID"
};

// Inicializar Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// MENÚ COMPLETO Y REAL DE STATION BAJÓN

// --- Carrusel de Fotos con Zoom Progresivo ---
document.addEventListener("DOMContentLoaded", () => {
    const fotos = document.querySelectorAll(".foto-carrusel");
    let indexFoto = 0;
    const tiempoCarrusel = 5000; // 5 segundos por foto

    function rotarCarruselFotos() {
        if (fotos.length === 0) return;

        // Ocultar la foto actual y resetear zoom
        fotos[indexFoto].classList.remove("opacity-100", "scale-110");
        fotos[indexFoto].classList.add("opacity-0", "scale-100");

        // Pasar a la siguiente
        indexFoto = (indexFoto + 1) % fotos.length;

        // Mostrar la nueva foto y activar el zoom lento (escala al 110%)
        fotos[indexFoto].classList.remove("opacity-0");
        fotos[indexFoto].classList.add("opacity-100", "scale-110");
    }

    // Inicializar la primera foto con zoom
    if (fotos.length > 0) {
        fotos[0].classList.add("scale-110");
    }

    // Activar el intervalo si hay más de una foto
    if (fotos.length > 1) {
        setInterval(rotarCarruselFotos, tiempoCarrusel);
    }
});

function abrirPanelAdmin() {
    document.getElementById('view-cliente').classList.add('hidden');
    document.getElementById('view-admin').classList.remove('hidden');
    // ... tus otras funciones de carga de Firebase para admin
}

function volverAlMenu() {
    document.getElementById('view-admin').classList.add('hidden');
    document.getElementById('view-cliente').classList.remove('hidden');
}

const menuBase = [
    // 1. HAMBURGUESAS CHEDDAR
    { id: 1, categoria: 'hamburguesas', nombre: 'Cheddar Simple', descripcion: 'Carne, cheddar. Incluye papas fritas.', precio: 8500, disponible: true },
    { id: 2, categoria: 'hamburguesas', nombre: 'Cheddar Doble', descripcion: 'Doble carne, doble cheddar. Incluye papas fritas.', precio: 9500, disponible: true },
    { id: 3, categoria: 'hamburguesas', nombre: 'Cheddar Triple', descripcion: 'Triple carne, triple cheddar. Incluye papas fritas.', precio: 11000, disponible: true },

    // HAMBURGUESAS BACON CHEDDAR
    { id: 4, categoria: 'hamburguesas', nombre: 'Bacon Cheddar Simple', descripcion: 'Carne, cheddar, panceta crocante. Incluye papas fritas.', precio: 8800, disponible: true },
    { id: 5, categoria: 'hamburguesas', nombre: 'Bacon Cheddar Doble', descripcion: 'Doble carne, cheddar, panceta crocante. Incluye papas fritas.', precio: 9800, disponible: true },
    { id: 6, categoria: 'hamburguesas', nombre: 'Bacon Cheddar Triple', descripcion: 'Triple carne, cheddar, panceta crocante. Incluye papas fritas.', precio: 11800, disponible: true },

    // HAMBURGUESAS CLÁSICAS
    { id: 7, categoria: 'hamburguesas', nombre: 'Clásica Simple', descripcion: 'Carne, cheddar, tomate fresco, lechuga. Incluye papas fritas.', precio: 8800, disponible: true },
    { id: 8, categoria: 'hamburguesas', nombre: 'Clásica Doble', descripcion: 'Doble carne, cheddar, tomate fresco, lechuga. Incluye papas fritas.', precio: 9800, disponible: true },

    // HAMBURGUESAS CRISPY
    { id: 9, categoria: 'hamburguesas', nombre: 'Crispy Simple', descripcion: 'Carne, cheddar, cebolla crispy crocante. Incluye papas fritas.', precio: 8800, disponible: true },
    { id: 10, categoria: 'hamburguesas', nombre: 'Crispy Doble', descripcion: 'Doble carne, cheddar, cebolla crispy crocante. Incluye papas fritas.', precio: 9800, disponible: true },

    // HAMBURGUESAS SWEET
    { id: 11, categoria: 'hamburguesas', nombre: 'Sweet Simple', descripcion: 'Carne, cheddar, cebolla caramelizada, panceta. Incluye papas fritas.', precio: 9500, disponible: true },
    { id: 12, categoria: 'hamburguesas', nombre: 'Sweet Doble', descripcion: 'Doble carne, cheddar, cebolla caramelizada, panceta. Incluye papas fritas.', precio: 10500, disponible: true },
    { id: 13, categoria: 'hamburguesas', nombre: 'Sweet Triple', descripcion: 'Triple carne, cheddar, cebolla caramelizada, panceta. Incluye papas fritas.', precio: 12500, disponible: true },

    // 2. PROMOCIONES DE HAMBURGUESAS
    { id: 14, categoria: 'promos', nombre: 'Promo 4 Simple Bacon', descripcion: '4 Hamburguesas Simples con Bacon y Cheddar + Papas Fritas.', precio: 33000, disponible: true },
    { id: 15, categoria: 'promos', nombre: 'Promo 2 Doble Bacon', descripcion: '2 Hamburguesas Dobles con Bacon y Cheddar + Papas Fritas.', precio: 19000, disponible: true },
    { id: 16, categoria: 'promos', nombre: 'Promo 4 Doble Bacon', descripcion: '4 Hamburguesas Dobles con Bacon y Cheddar + Papas Fritas.', precio: 38000, disponible: true },

    // 3. PAPAS FRITAS Y ADICIONALES
    { id: 17, categoria: 'papas', nombre: 'Porción de papas sola', descripcion: 'Porción grande de papas fritas crocantes.', precio: 6000, disponible: true },
    { id: 18, categoria: 'papas', nombre: 'Extra de papas', descripcion: 'Adicional extra de papas fritas.', precio: 3500, disponible: true },
    { id: 19, categoria: 'papas', nombre: 'Topping Cheddar en papas', descripcion: 'Adicional de salsa cheddar derretida sobre las papas.', precio: 1000, disponible: true },
    { id: 20, categoria: 'papas', nombre: 'Topping Bacon en papas', descripcion: 'Adicional de panceta crocante picada sobre las papas.', precio: 1000, disponible: true },

    // 4. SALSAS Y DIPS
    { id: 21, categoria: 'salsas', nombre: 'Dip de cheddar', descripcion: 'Pote individual de cheddar liquido.', precio: 1500, disponible: true },
    { id: 22, categoria: 'salsas', nombre: 'Dip de barbacoa', descripcion: 'Pote individual de salsa barbacoa.', precio: 1500, disponible: true },
    { id: 23, categoria: 'salsas', nombre: 'Dip de alioli', descripcion: 'Pote individual de salsa alioli casera.', precio: 1500, disponible: true },
    { id: 24, categoria: 'salsas', nombre: 'Pileta de cheddar', descripcion: 'Porción abundante de cheddar liquido para bañar todo.', precio: 4500, disponible: true },

    // 5. BEBIDAS
    { id: 25, categoria: 'bebidas', nombre: 'Coca-Cola 500 ml', descripcion: 'Botella de Coca-Cola fría 500ml.', precio: 2000, disponible: true },
    { id: 26, categoria: 'bebidas', nombre: 'Manaos Cola 600 ml', descripcion: 'Botella de Manaos Cola fría 600ml.', precio: 1500, disponible: true }
];

// Estado del Local (true: Abierto, false: Cerrado)
let localAbierto = JSON.parse(localStorage.getItem('sb_local_abierto'));
if (localAbierto === null) localAbierto = true;

// Cargar menú
let menu = JSON.parse(localStorage.getItem('sb_menu')) || menuBase;

if (menu.length !== menuBase.length) {
    menu = menuBase;
    localStorage.setItem('sb_menu', JSON.stringify(menu));
}

let carrito = [];
let pedidos = JSON.parse(localStorage.getItem('sb_pedidos')) || [];
let categoriaActual = 'todas';

// Render Menú Cliente
function renderProductos(categoria = categoriaActual) {
    categoriaActual = categoria;
    const grid = document.getElementById('productos-grid');
    grid.innerHTML = '';
    const filtrados = categoria === 'todas' ? menu : menu.filter(p => p.categoria === categoria);

    actualizarBannerLocal();

    filtrados.forEach(prod => {
        const disponible = prod.disponible !== false && localAbierto;
        grid.innerHTML += `
            <div class="bg-brand-darkCard border ${disponible ? 'border-gray-800' : 'border-red-900/40 opacity-75'} rounded-xl p-4 flex justify-between items-center relative overflow-hidden">
                <div class="flex-1 pr-4">
                    <h3 class="font-oswald text-lg font-bold text-white uppercase">${prod.nombre}</h3>
                    <p class="text-xs text-gray-400 mt-1 line-clamp-2">${prod.descripcion}</p>
                    <span class="font-oswald text-brand-yellow text-lg font-bold mt-2 block">$${prod.precio.toLocaleString()}</span>
                </div>
                ${disponible ? `
                    <button onclick="agregarAlCarrito(${prod.id})" class="bg-brand-yellow text-brand-black px-4 py-2 rounded-lg font-bold font-oswald text-sm hover:bg-brand-darkYellow uppercase transition">
                        + Agregar
                    </button>
                ` : `
                    <div class="bg-red-500/20 text-red-400 border border-red-500/30 px-3 py-1.5 rounded-lg font-oswald text-xs font-bold uppercase text-center">
                        ${!localAbierto ? 'CERRADO' : 'AGOTADO'}
                    </div>
                `}
            </div>
        `;
    });
}

function actualizarBannerLocal() {
    const banner = document.getElementById('banner-estado-local');
    const badge = document.getElementById('badge-estado');
    const titulo = document.getElementById('titulo-estado');
    const emoji = document.getElementById('emoji-estado');

    if (localAbierto) {
        banner.className = "bg-brand-yellow text-brand-black p-4 rounded-xl mb-6 font-oswald uppercase tracking-wide shadow-md flex justify-between items-center";
        badge.innerText = "HOY SE BAJONEA";
        titulo.innerText = "Realiza tu pedido online";
        emoji.innerText = "🍔";
    } else {
        banner.className = "bg-red-600 text-white p-4 rounded-xl mb-6 font-oswald uppercase tracking-wide shadow-md flex justify-between items-center";
        badge.innerText = "LOCAL CERRADO";
        titulo.innerText = "No estamos tomando pedidos ahora";
        emoji.innerText = "🚫";
    }
}

function filtrarCategoria(cat) {
    document.querySelectorAll('.cat-btn').forEach(btn => {
        btn.classList.remove('bg-brand-yellow', 'text-brand-black');
        btn.classList.add('bg-brand-darkCard', 'text-gray-300');
    });
    event.target.classList.remove('bg-brand-darkCard', 'text-gray-300');
    event.target.classList.add('bg-brand-yellow', 'text-brand-black');
    renderProductos(cat);
}

// Carrito
function agregarAlCarrito(id) {
    if (!localAbierto) {
        alert("El local se encuentra cerrado temporalmente.");
        return;
    }

    const prod = menu.find(p => p.id === id);
    if (!prod || prod.disponible === false) {
        alert("Este producto no está disponible por hoy.");
        return;
    }

    const index = carrito.findIndex(item => item.id === id);

    if (index > -1) {
        carrito[index].cantidad += 1;
    } else {
        carrito.push({ ...prod, cantidad: 1 });
    }

    actualizarCarritoUI();
}

function modificarCantidad(id, cambio) {
    const index = carrito.findIndex(item => item.id === id);
    if (index > -1) {
        carrito[index].cantidad += cambio;
        if (carrito[index].cantidad <= 0) {
            carrito.splice(index, 1);
        }
    }
    actualizarCarritoUI();
    renderModalCarrito();
}

function actualizarCarritoUI() {
    const count = carrito.reduce((sum, item) => sum + item.cantidad, 0);
    const total = carrito.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);

    document.getElementById('carrito-count').innerText = count;
    document.getElementById('carrito-total-bar').innerText = `$${total.toLocaleString()}`;

    const bar = document.getElementById('carrito-bar');
    if (count > 0 && localAbierto) {
        bar.classList.remove('hidden');
    } else {
        bar.classList.add('hidden');
        document.getElementById('modal-carrito').classList.add('hidden');
    }
}

function toggleCarritoModal() {
    const modal = document.getElementById('modal-carrito');
    modal.classList.toggle('hidden');
    if (!modal.classList.contains('hidden')) {
        renderModalCarrito();
    }
}

function renderModalCarrito() {
    const container = document.getElementById('modal-carrito-items');
    container.innerHTML = '';
    let total = 0;

    carrito.forEach(item => {
        const subtotal = item.precio * item.cantidad;
        total += subtotal;

        container.innerHTML += `
            <div class="flex justify-between items-center pt-2">
                <div>
                    <h5 class="font-bold text-sm">${item.nombre}</h5>
                    <span class="text-xs text-brand-yellow font-bold">$${item.precio.toLocaleString()} c/u</span>
                </div>
                <div class="flex items-center space-x-2">
                    <button onclick="modificarCantidad(${item.id}, -1)" class="w-6 h-6 bg-gray-800 text-white rounded font-bold text-xs">-</button>
                    <span class="text-sm font-bold w-4 text-center">${item.cantidad}</span>
                    <button onclick="modificarCantidad(${item.id}, 1)" class="w-6 h-6 bg-brand-yellow text-brand-black rounded font-bold text-xs">+</button>
                </div>
            </div>
        `;
    });

    document.getElementById('modal-total').innerText = `$${total.toLocaleString()}`;
}

function cambiarTipoEntrega() {
    const tipo = document.getElementById('cliente-tipo').value;
    const campoDir = document.getElementById('campo-direccion');
    if (tipo === 'local') {
        campoDir.classList.add('hidden');
    } else {
        campoDir.classList.remove('hidden');
    }
}

// WhatsApp Direct Link
function enviarAPedidoWhatsApp() {
    if (!localAbierto) {
        alert("El local cerró. No se pueden procesar nuevos pedidos.");
        return;
    }

    const nombre = document.getElementById('cliente-nombre').value.trim();
    const tipo = document.getElementById('cliente-tipo').value;
    const direccion = document.getElementById('cliente-direccion').value.trim();
    const pago = document.getElementById('cliente-pago').value;
    const notas = document.getElementById('cliente-notas').value.trim();

    if (!nombre) {
        alert("Por favor completa tu nombre.");
        return;
    }
    if (tipo === 'delivery' && !direccion) {
        alert("Por favor completa la dirección de entrega.");
        return;
    }

    for (let item of carrito) {
        const actual = menu.find(m => m.id === item.id);
        if (actual && actual.disponible === false) {
            alert(`El producto "${item.nombre}" ya no está disponible por hoy. Quítalo del carrito para continuar.`);
            return;
        }
    }

    const total = carrito.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);

    const nuevoPedido = {
        id: Date.now(),
        fecha: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        cliente: nombre,
        tipo: tipo === 'delivery' ? 'Delivery 🛵' : 'Retiro en local 🛍️',
        direccion: tipo === 'delivery' ? direccion : 'Retira en local',
        pago: pago,
        notas: notas,
        items: [...carrito],
        total: total
    };

    pedidos.unshift(nuevoPedido);
    localStorage.setItem('sb_pedidos', JSON.stringify(pedidos));

    let msj = `*--- NUEVO PEDIDO - STATION BAJÓN ---*\n`;
    msj += `*Cliente:* ${nombre}\n`;
    msj += `*Modalidad:* ${tipo === 'delivery' ? 'Delivery 🛵' : 'Retiro en local 🛍️'}\n`;
    if (tipo === 'delivery') {
        msj += `*Dirección:* ${direccion}\n`;
    }
    msj += `*Pago:* ${pago}\n`;
    if (notas) {
        msj += `*Notas:* ${notas}\n`;
    }
    msj += `\n*DETALLE DEL PEDIDO:*\n`;

    carrito.forEach(item => {
        msj += `• ${item.cantidad}x ${item.nombre} ($${(item.precio * item.cantidad).toLocaleString()})\n`;
    });

    msj += `\n*TOTAL: $${total.toLocaleString()}*`;

    const url = `https://api.whatsapp.com/send?phone=5491130294713&text=${encodeURIComponent(msj)}`;

    carrito = [];
    actualizarCarritoUI();

    window.open(url, '_blank');
}

// LÓGICA DE AUTENTICACIÓN ADMIN
function solicitarAccesoAdmin() {
    if (isAdminLoggedIn) {
        mostrarVistaAdmin();
    } else {
        document.getElementById('modal-login').classList.remove('hidden');
        document.getElementById('login-error').classList.add('hidden');
    }
}

function cerrarModalLogin() {
    document.getElementById('modal-login').classList.add('hidden');
}

function validarLogin(e) {
    e.preventDefault();
    const user = document.getElementById('admin-user').value.trim();
    const pass = document.getElementById('admin-pass').value.trim();

    if (user === ADMIN_USER && pass === ADMIN_PASS) {
        isAdminLoggedIn = true;
        cerrarModalLogin();
        mostrarVistaAdmin();
    } else {
        document.getElementById('login-error').classList.remove('hidden');
    }
}

function mostrarVistaAdmin() {
    document.getElementById('view-cliente').classList.add('hidden');
    document.getElementById('view-admin').classList.remove('hidden');
    document.getElementById('btn-admin-access').innerText = "📋 Ver Comandera";
    renderBotonLocal();
    renderAdminStock();
    renderAdmin();
}

function volverAlMenu() {
    document.getElementById('view-admin').classList.add('hidden');
    document.getElementById('view-cliente').classList.remove('hidden');
    renderProductos();
}

function cerrarSesionAdmin() {
    isAdminLoggedIn = false;
    volverAlMenu();
    document.getElementById('btn-admin-access').innerText = "🔒 Admin / Comandera";
    document.getElementById('admin-user').value = "";
    document.getElementById('admin-pass').value = "";
}

// NAVEGACIÓN SOLAPAS ADMIN
function cambiarSolapaAdmin(solapa) {
    const btnPedidos = document.getElementById('tab-btn-pedidos');
    const btnStock = document.getElementById('tab-btn-stock');
    const solapaPedidos = document.getElementById('solapa-pedidos');
    const solapaStock = document.getElementById('solapa-stock');

    if (solapa === 'pedidos') {
        btnPedidos.className = "font-oswald text-lg font-bold pb-2 border-b-2 border-brand-yellow text-brand-yellow";
        btnStock.className = "font-oswald text-lg font-bold pb-2 text-gray-400 hover:text-white";
        solapaPedidos.classList.remove('hidden');
        solapaStock.classList.add('hidden');
    } else {
        btnStock.className = "font-oswald text-lg font-bold pb-2 border-b-2 border-brand-yellow text-brand-yellow";
        btnPedidos.className = "font-oswald text-lg font-bold pb-2 text-gray-400 hover:text-white";
        solapaStock.classList.remove('hidden');
        solapaPedidos.classList.add('hidden');
    }
}

// CONTROL DE LOCAL (ABIERTO / CERRADO)
function renderBotonLocal() {
    const btn = document.getElementById('btn-toggle-local');
    if (localAbierto) {
        btn.className = "bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-oswald font-bold text-sm uppercase transition";
        btn.innerText = "🟢 Local Abierto";
    } else {
        btn.className = "bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-oswald font-bold text-sm uppercase transition";
        btn.innerText = "🔴 Local Cerrado";
    }
}

function toggleEstadoLocal() {
    localAbierto = !localAbierto;
    localStorage.setItem('sb_local_abierto', JSON.stringify(localAbierto));
    renderBotonLocal();
    renderProductos();
}

function limpiarComandera() {
    if (confirm("¿Estás seguro de borrar todos los pedidos guardados para empezar un nuevo día?")) {
        pedidos = [];
        localStorage.removeItem('sb_pedidos');
        renderAdmin();
    }
}

// RENDER DE CONTROL DE STOCK EN ADMIN
function renderAdminStock() {
    const container = document.getElementById('stock-lista');
    container.innerHTML = '';

    menu.forEach(prod => {
        const disponible = prod.disponible !== false;
        container.innerHTML += `
            <label class="flex items-center justify-between p-3 bg-brand-darkInput border border-gray-800 rounded-lg cursor-pointer hover:border-brand-yellow/50 transition">
                <div>
                    <span class="font-bold text-sm text-white block">${prod.nombre}</span>
                    <span class="text-xs text-brand-yellow">$${prod.precio.toLocaleString()}</span>
                </div>
                <input type="checkbox" ${disponible ? 'checked' : ''} onchange="toggleDisponibilidad(${prod.id})" class="w-5 h-5 accent-brand-yellow rounded cursor-pointer">
            </label>
        `;
    });
}

function toggleDisponibilidad(id) {
    const prod = menu.find(p => p.id === id);
    if (prod) {
        prod.disponible = !prod.disponible;
        localStorage.setItem('sb_menu', JSON.stringify(menu));
        renderAdminStock();
        renderProductos();
    }
}

function renderAdmin() {
    const container = document.getElementById('pedidos-lista');
    container.innerHTML = '';

    if (pedidos.length === 0) {
        container.innerHTML = `<p class="text-gray-400 text-sm italic py-4">No hay pedidos registrados en la comandera.</p>`;
        return;
    }

    pedidos.forEach(p => {
        let itemsHtml = p.items.map(i => `<li class="text-sm">• ${i.cantidad}x ${i.nombre} ($${(i.precio * i.cantidad).toLocaleString()})</li>`).join('');

        container.innerHTML += `
            <div class="bg-brand-darkCard border border-brand-yellow/30 rounded-xl p-4 space-y-3">
                <div class="flex justify-between items-start border-b border-gray-800 pb-2">
                    <div>
                        <span class="font-oswald text-brand-yellow text-lg font-bold">#${p.id.toString().slice(-4)}</span>
                        <span class="text-xs text-gray-400 ml-2">${p.fecha}</span>
                        <h4 class="font-bold text-white text-base">${p.cliente}</h4>
                    </div>
                    <span class="bg-brand-yellow text-brand-black text-xs px-2 py-1 rounded font-bold uppercase">${p.tipo}</span>
                </div>

                <div class="text-xs text-gray-300 space-y-1">
                    <p><strong>Dirección:</strong> ${p.direccion}</p>
                    <p><strong>Método de pago:</strong> ${p.pago}</p>
                    ${p.notas ? `<p class="text-brand-yellow"><strong>Notas:</strong> ${p.notas}</p>` : ''}
                </div>

                <ul class="bg-brand-darkInput p-2 rounded border border-gray-800 text-gray-200">
                    ${itemsHtml}
                </ul>

                <div class="flex justify-between items-center pt-2">
                    <span class="font-oswald text-xl text-brand-yellow font-bold">Total: $${p.total.toLocaleString()}</span>
                    <button onclick="imprimirTicket(${p.id})" class="bg-white hover:bg-gray-200 text-black px-4 py-2 rounded-lg font-bold font-oswald text-xs uppercase flex items-center gap-1 transition">
                        🖨️ Imprimir Comanda
                    </button>
                </div>
            </div>
        `;
    });
}

// Impresión en Comandera Térmica
function imprimirTicket(id) {
    const p = pedidos.find(item => item.id === id);
    if (!p) return;

    let itemsTxt = p.items.map(i => `${i.cantidad}x ${i.nombre.padEnd(20, ' ')} $${(i.precio * i.cantidad).toLocaleString()}`).join('<br>');

    const ticketContent = `
        <div style="text-align: center; border-bottom: 1px dashed #000; padding-bottom: 5px; margin-bottom: 5px;">
            <h2 style="font-size: 16px; font-weight: bold; margin:0;">STATION BAJÓN</h2>
            <p style="font-size: 10px; margin:2px 0;">Villa Lugano - Delivery</p>
            <p style="font-size: 10px; margin:0;">Ticket #${p.id.toString().slice(-4)} - ${p.fecha}</p>
        </div>
        <div style="font-size: 11px; margin-bottom: 8px;">
            <strong>CLIENTE:</strong> ${p.cliente}<br>
            <strong>MODALIDAD:</strong> ${p.tipo}<br>
            <strong>DIRECCIÓN:</strong> ${p.direccion}<br>
            <strong>PAGO:</strong> ${p.pago}<br>
            ${p.notas ? `<strong>NOTAS:</strong> ${p.notas}<br>` : ''}
        </div>
        <div style="border-top: 1px dashed #000; border-bottom: 1px dashed #000; padding: 5px 0; font-size: 11px;">
            ${itemsTxt}
        </div>
        <div style="text-align: right; font-size: 14px; font-weight: bold; margin-top: 5px;">
            TOTAL: $${p.total.toLocaleString()}
        </div>
    `;

    document.getElementById('print-ticket').innerHTML = ticketContent;
    window.print();
}

// Inicializar
renderProductos();
