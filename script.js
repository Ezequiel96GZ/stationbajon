// Detectar si estás trabajando en tu computadora (Local) o en la web real (Vercel)
const esLocal = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1" || window.location.protocol === "file:";

const firebaseConfig = esLocal ? {
    // 🧪 PROYECTO DE PRUEBAS (station-pruebas)
    apiKey: "AIzaSyDEUc4s4Jac7waxPueOxApw3dF_nxfacb4",
    authDomain: "station-pruebas.firebaseapp.com",
    projectId: "station-pruebas",
    storageBucket: "station-pruebas.fireapp.com",
    messagingSenderId: "293103559921",
    appId: "1:293103559921:web:135fe793b0103b821a3550"
} : {
    // 🚀 PROYECTO REAL DE PRODUCCIÓN (Station Bajon)
    apiKey: "AIzaSyBIY2-3it6w6oU8GYSXBfn4nBFXDwoJUUc",
    authDomain: "station-bajon.firebaseapp.com",
    projectId: "station-bajon",
    storageBucket: "station-bajon.firebasestorage.app",
    messagingSenderId: "738699771128",
    appId: "1:738699771128:web:a4eafa2a3e54e97698cf0d"
};

// Inicializar Firebase de manera segura
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
const db = firebase.firestore();

// MENÚ BASE DE RESPALDO
const menuBase = [
    { id: 1, categoria: 'hamburguesas', nombre: 'Cheddar Simple', descripcion: 'Carne, cheddar. Incluye papas fritas.', precio: 8500, disponible: true },
    { id: 2, categoria: 'hamburguesas', nombre: 'Cheddar Doble', descripcion: 'Doble carne, doble cheddar. Incluye papas fritas.', precio: 9500, disponible: true },
    { id: 3, categoria: 'hamburguesas', nombre: 'Cheddar Triple', descripcion: 'Triple carne, triple cheddar. Incluye papas fritas.', precio: 11000, disponible: true },
    { id: 4, categoria: 'hamburguesas', nombre: 'Bacon Cheddar Simple', descripcion: 'Carne, cheddar, panceta crocante. Incluye papas fritas.', precio: 8800, disponible: true },
    { id: 5, categoria: 'hamburguesas', nombre: 'Bacon Cheddar Doble', descripcion: 'Doble carne, cheddar, panceta crocante. Incluye papas fritas.', precio: 9800, disponible: true },
    { id: 6, categoria: 'hamburguesas', nombre: 'Bacon Cheddar Triple', descripcion: 'Triple carne, cheddar, panceta crocante. Incluye papas fritas.', precio: 11800, disponible: true },
    { id: 7, categoria: 'hamburguesas', nombre: 'Clásica Simple', descripcion: 'Carne, cheddar, tomate fresco, lechuga. Incluye papas fritas.', precio: 8800, disponible: true },
    { id: 8, categoria: 'hamburguesas', nombre: 'Clásica Doble', descripcion: 'Doble carne, cheddar, tomate fresco, lechuga. Incluye papas fritas.', precio: 9800, disponible: true },
    { id: 9, categoria: 'hamburguesas', nombre: 'Crispy Simple', descripcion: 'Carne, cheddar, cebolla crispy crocante. Incluye papas fritas.', precio: 8800, disponible: true },
    { id: 10, categoria: 'hamburguesas', nombre: 'Crispy Doble', descripcion: 'Doble carne, cheddar, cebolla crispy crocante. Incluye papas fritas.', precio: 9800, disponible: true },
    { id: 11, categoria: 'hamburguesas', nombre: 'Sweet Simple', descripcion: 'Carne, cheddar, cebolla caramelizada, panceta. Incluye papas fritas.', precio: 9500, disponible: true },
    { id: 12, categoria: 'hamburguesas', nombre: 'Sweet Doble', descripcion: 'Doble carne, cheddar, cebolla caramelizada, panceta. Incluye papas fritas.', precio: 10500, disponible: true },
    { id: 13, categoria: 'hamburguesas', nombre: 'Sweet Triple', descripcion: 'Triple carne, cheddar, cebolla caramelizada, panceta. Incluye papas fritas.', precio: 12500, disponible: true },
    { id: 14, categoria: 'promos', nombre: 'Promo 4 Simple Bacon', descripcion: '4 Hamburguesas Simples con Bacon y Cheddar + Papas Fritas.', precio: 33000, disponible: true },
    { id: 15, categoria: 'promos', nombre: 'Promo 2 Doble Bacon', descripcion: '2 Hamburguesas Dobles con Bacon y Cheddar + Papas Fritas.', precio: 19000, disponible: true },
    { id: 16, categoria: 'promos', nombre: 'Promo 4 Doble Bacon', descripcion: '4 Hamburguesas Dobles con Bacon y Cheddar + Papas Fritas.', precio: 38000, disponible: true },
    { id: 17, categoria: 'papas', nombre: 'Porción de papas sola', descripcion: 'Porción grande de papas fritas crocantes.', precio: 6000, disponible: true },
    { id: 18, categoria: 'papas', nombre: 'Extra de papas', descripcion: 'Adicional extra de papas fritas.', precio: 3500, disponible: true },
    { id: 19, categoria: 'papas', nombre: 'Topping Cheddar en papas', descripcion: 'Adicional de salsa cheddar derretida sobre las papas.', precio: 1000, disponible: true },
    { id: 20, categoria: 'papas', nombre: 'Topping Bacon en papas', descripcion: 'Adicional de panceta crocante picada sobre las papas.', precio: 1000, disponible: true },
    { id: 21, categoria: 'salsas', nombre: 'Dip de cheddar', descripcion: 'Pote individual de cheddar liquido.', precio: 1500, disponible: true },
    { id: 22, categoria: 'salsas', nombre: 'Dip de barbacoa', descripcion: 'Pote individual de salsa barbacoa.', precio: 1500, disponible: true },
    { id: 23, categoria: 'salsas', nombre: 'Dip de alioli', descripcion: 'Pote individual de salsa alioli casera.', precio: 1500, disponible: true },
    { id: 24, categoria: 'salsas', nombre: 'Pileta de cheddar', descripcion: 'Porción abundante de cheddar liquido para bañar todo.', precio: 4500, disponible: true },
    { id: 25, categoria: 'bebidas', nombre: 'Coca-Cola 500 ml', descripcion: 'Botella de Coca-Cola fría 500ml.', precio: 2000, disponible: true },
    { id: 26, categoria: 'bebidas', nombre: 'Manaos Cola 600 ml', descripcion: 'Botella de Manaos Cola fría 600ml.', precio: 1500, disponible: true }
];

// Variables de Estado Globales y Control de Seguridad
let localAbierto = true;
let menu = [];
let carrito = [];
let pedidos = [];
let categoriaActual = 'todas';
let isAdminLoggedIn = false;
let isMigrating = false;

// Variable de control de seguridad para evitar duplicaciones por clic múltiple
let isSubmitting = false;

// Variables temporales para la edición de pedidos interactiva
let pedidoEnEdicionItems = [];
let pedidoEnEdicionId = null;

// --- INICIALIZACIÓN Y CONEXIÓN CON FIRESTORE ---
document.addEventListener("DOMContentLoaded", () => {
    // 1. Carrusel de Fotos
    const fotos = document.querySelectorAll(".foto-carrusel");
    let indexFoto = 0;
    const tiempoCarrusel = 5000;

    function rotarCarruselFotos() {
        if (fotos.length === 0) return;
        fotos[indexFoto].classList.remove("opacity-100", "scale-110");
        fotos[indexFoto].classList.add("opacity-0", "scale-100");

        indexFoto = (indexFoto + 1) % fotos.length;

        fotos[indexFoto].classList.remove("opacity-0");
        fotos[indexFoto].classList.add("opacity-100", "scale-110");
    }

    if (fotos.length > 0) fotos[0].classList.add("scale-110");
    if (fotos.length > 1) setInterval(rotarCarruselFotos, tiempoCarrusel);

    // Mantener la sesión activa si se recarga la página
    firebase.auth().onAuthStateChanged((user) => {
        isAdminLoggedIn = !!user;
    });

    // 2. Escuchar Estado del Local
    db.collection("configuracion").doc("local").onSnapshot((doc) => {
        if (doc.exists) {
            localAbierto = doc.data().abierto !== false;
        } else {
            db.collection("configuracion").doc("local").set({ abierto: true });
            localAbierto = true;
        }
        renderBotonLocal();
        renderProductos();
    });

    // 3. Escuchar Menú en Tiempo Real de Forma Controlada
    db.collection("menu").onSnapshot((snapshot) => {
        if (isMigrating) return;

        const nuevosProductos = [];
        snapshot.forEach((doc) => {
            nuevosProductos.push({ idFirebase: doc.id, ...doc.data() });
        });

        menu = nuevosProductos;

        if (menu.length === 0 && !isMigrating) {
            isMigrating = true;
            const batch = db.batch();
            menuBase.forEach(itemBase => {
                const docRef = db.collection("menu").doc();
                batch.set(docRef, itemBase);
            });
            batch.commit().then(() => {
                isMigrating = false;
            });
            return;
        }

        renderProductos();
        if (isAdminLoggedIn) renderAdminStock();
    });

    // 4. Escuchar Pedidos / Comandera (Ordenados del más reciente al más antiguo)
    db.collection("pedidos").orderBy("idOrdenSecuencial", "desc").onSnapshot((snapshot) => {
        pedidos = [];
        snapshot.forEach((doc) => {
            pedidos.push({ idFirebase: doc.id, ...doc.data() });
        });
        
        calcularResumenVentasDia(pedidos);
        if (isAdminLoggedIn) renderAdmin();
    });
});

// Render Menú Cliente (Ordenado Simples -> Dobles -> Triples)
function renderProductos(categoria = categoriaActual) {
    categoriaActual = categoria;
    const grid = document.getElementById('productos-grid');
    if (!grid) return;
    grid.innerHTML = '';
    
    let filtrados = categoria === 'todas' ? [...menu] : menu.filter(p => p.categoria === categoria);

    filtrados.sort((a, b) => {
        const nombreA = (a.nombre || "").toLowerCase();
        const nombreB = (b.nombre || "").toLowerCase();

        const obtenerPeso = (nombre) => {
            if (nombre.includes('simple')) return 1;
            if (nombre.includes('doble')) return 2;
            if (nombre.includes('triple')) return 3;
            return 4; 
        };

        const pesoA = obtenerPeso(nombreA);
        const pesoB = obtenerPeso(nombreB);

        if (pesoA === pesoB) {
            return nombreA.localeCompare(nombreB);
        }

        return pesoA - pesoB;
    });

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
                    <button onclick="agregarAlCarrito('${prod.idFirebase}')" class="bg-brand-yellow text-brand-black px-4 py-2 rounded-lg font-bold font-oswald text-sm hover:bg-brand-darkYellow uppercase transition">
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

    if (!banner) return;

    if (localAbierto) {
        banner.className = "bg-green-600 text-brand-black p-4 rounded-xl mb-6 font-oswald uppercase tracking-wide shadow-md flex justify-between items-center";
        badge.innerText = "¿ESTAS DE BAJON?";
        titulo.innerText = "REALIZA TU PEDIDO ONLINE";
        emoji.innerText = "🍔";
    } else {
        banner.className = "relative w-full text-white py-3 px-5 rounded-xl mb-4 font-oswald uppercase tracking-wide shadow-md flex justify-between items-center bg-red-600";
        badge.innerText = "LOCAL CERRADO";
        titulo.innerText = "¿TE QUEDASTE CON GANAS? ¡¡VOLVEREMOS ABRIR A LAS 19HS!!";
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
function agregarAlCarrito(idFirebase) {
    if (!localAbierto) {
        alert("El local se encuentra cerrado temporalmente.");
        return;
    }

    const prod = menu.find(p => p.idFirebase === idFirebase);
    if (!prod || prod.disponible === false) {
        alert("Este producto no está disponible por hoy.");
        return;
    }

    const index = carrito.findIndex(item => item.idFirebase === idFirebase);

    if (index > -1) {
        carrito[index].cantidad += 1;
    } else {
        carrito.push({ ...prod, cantidad: 1 });
    }

    actualizarCarritoUI();
}

function modificarCantidad(idFirebase, cambio) {
    const index = carrito.findIndex(item => item.idFirebase === idFirebase);
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
    if (!container) return;
    container.innerHTML = '';
    let total = 0;

    carrito.forEach(item => {
        const subtotal = item.precio * item.cantidad;
        total += subtotal;

        container.innerHTML += `
            <div class="flex justify-between items-center pt-2">
                <div>
                    <h5 class="font-bold text-sm text-white">${item.nombre}</h5>
                    <span class="text-xs text-brand-yellow font-bold">$${item.precio.toLocaleString()} c/u</span>
                </div>
                <div class="flex items-center space-x-2">
                    <button onclick="modificarCantidad('${item.idFirebase}', -1)" class="w-6 h-6 bg-gray-800 text-white rounded font-bold text-xs">-</button>
                    <span class="text-sm font-bold w-4 text-center text-white">${item.cantidad}</span>
                    <button onclick="modificarCantidad('${item.idFirebase}', 1)" class="w-6 h-6 bg-brand-yellow text-brand-black rounded font-bold text-xs">+</button>
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

// Envío de Pedido a Firestore y WhatsApp
async function enviarAPedidoWhatsApp() {
    if (isSubmitting) return;

    if (!localAbierto) {
        alert("El local cerró. No se pueden procesar nuevos pedidos.");
        return;
    }

    if (!carrito || carrito.length === 0) {
        alert("Tu carrito está vacío. Agrega productos antes de enviar el pedido.");
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
        const actual = menu.find(m => m.idFirebase === item.idFirebase);
        if (actual && actual.disponible === false) {
            alert(`El producto "${item.nombre}" ya no está disponible por hoy. Quítalo del carrito para continuar.`);
            return;
        }
    }

    const total = carrito.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
    
    if (total <= 0) {
        alert("El total del pedido no puede ser $0.");
        return;
    }

    isSubmitting = true;

    const btnEnviar = document.querySelector('button[onclick*="enviarAPedidoWhatsApp"]');
    if (btnEnviar) {
        btnEnviar.style.opacity = "0.5";
        btnEnviar.innerText = "PROCESANDO...";
    }

    try {
        // Obtenemos el número secuencial más alto registrado o contaremos documentos existentes
        const snapshot = await db.collection("pedidos").get();
        let maxSecuencial = 0;
        snapshot.forEach(doc => {
            const sec = doc.data().idOrdenSecuencial || 0;
            if (sec > maxSecuencial) maxSecuencial = sec;
        });

        const numeroSecuencial = maxSecuencial + 1;
        const numeroOrdenFormateado = "ORD-" + String(numeroSecuencial).padStart(4, '0');

        const ahora = new Date();
        const fechaFormateada = ahora.toLocaleDateString('es-AR');
        const horaFormateada = ahora.toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });
        const fechaCompletaStr = `${fechaFormateada} - ${horaFormateada} hs`;

        const nuevoPedido = {
            id: Date.now(),
            idOrdenSecuencial: numeroSecuencial,
            numeroOrden: numeroOrdenFormateado,
            fecha: fechaCompletaStr,
            cliente: nombre,
            tipo: tipo === 'delivery' ? 'Delivery 🛵' : 'Retiro en local 🛍️',
            direccion: tipo === 'delivery' ? direccion : 'Retira en local',
            pago: pago,
            notas: notas,
            items: [...carrito],
            total: total
        };

        await db.collection("pedidos").add(nuevoPedido);

        let msj = `*--- NUEVO PEDIDO (${numeroOrdenFormateado}) - STATION BAJÓN ---*\n`;
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

        const modalCarrito = document.getElementById('modal-carrito');
        if (modalCarrito) {
            modalCarrito.classList.add('hidden');
        }

        document.getElementById('cliente-nombre').value = '';
        if (document.getElementById('cliente-direccion')) document.getElementById('cliente-direccion').value = '';
        if (document.getElementById('cliente-notas')) document.getElementById('cliente-notas').value = '';

        window.open(url, '_blank');

    } catch (error) {
        console.error("Error al registrar el pedido: ", error);
        alert("Hubo un error al enviar el pedido a la base de datos.");
    } finally {
        isSubmitting = false;
        if (btnEnviar) {
            btnEnviar.style.opacity = "1";
            btnEnviar.innerText = "ENVIAR PEDIDO POR WHATSAPP";
        }
    }
}

// --- AUTENTICACIÓN ADMIN ---
function solicitarAccesoAdmin() {
    if (firebase.auth().currentUser || isAdminLoggedIn) {
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
    const email = document.getElementById('admin-user').value.trim();
    const pass = document.getElementById('admin-pass').value.trim();

    firebase.auth().signInWithEmailAndPassword(email, pass)
        .then(() => {
            isAdminLoggedIn = true;
            cerrarModalLogin();
            mostrarVistaAdmin();
        })
        .catch((error) => {
            console.error("Error de autenticación:", error.message);
            const errorDiv = document.getElementById('login-error');
            if (errorDiv) {
                errorDiv.innerText = "Correo o contraseña incorrectos.";
                errorDiv.classList.remove('hidden');
            } else {
                alert("Credenciales inválidas.");
            }
        });
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
    firebase.auth().signOut().then(() => {
        isAdminLoggedIn = false;
        volverAlMenu();
        const btnAdmin = document.getElementById('btn-admin-access');
        if (btnAdmin) btnAdmin.innerText = "🔒 ADMIN";
        
        const userInput = document.getElementById('admin-user');
        const passInput = document.getElementById('admin-pass');
        if (userInput) userInput.value = "";
        if (passInput) passInput.value = "";
    });
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
    if (!btn) return;
    if (localAbierto) {
        btn.className = "bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-oswald font-bold text-sm uppercase transition";
        btn.innerText = "✅ Local Abierto";
    } else {
        btn.className = "bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-oswald font-bold text-sm uppercase transition";
        btn.innerText = "🔴 Local Cerrado";
    }
}

function toggleEstadoLocal() {
    localAbierto = !localAbierto;
    db.collection("configuracion").doc("local").set({
        abierto: localAbierto
    }).then(() => {
        renderBotonLocal();
        renderProductos();
    }).catch((error) => {
        console.error("Error al actualizar el estado del local: ", error);
    });
}

// Limpiar comandera borrando físicamente la colección en lote para reiniciar contador a ORD-0001
async function limpiarComandera() {
    if (confirm("¿Estás seguro de borrar todos los pedidos de la base de datos? Esto reiniciará el número de orden a ORD-0001.")) {
        try {
            const querySnapshot = await db.collection("pedidos").get();
            const batch = db.batch();
            querySnapshot.forEach((doc) => {
                batch.delete(doc.ref);
            });
            await batch.commit();
            console.log("Comandera limpiada con éxito.");
        } catch (error) {
            console.error("Error al limpiar la comandera: ", error);
            alert("No tienes permisos o ocurrió un error al limpiar la comandera.");
        }
    }
}

// RENDER DE CONTROL DE STOCK Y EDICIÓN DE PRODUCTOS EN ADMIN
function renderAdminStock() {
    const container = document.getElementById('stock-lista');
    if (!container) return;
    container.innerHTML = '';

    menu.forEach(prod => {
        const disponible = prod.disponible !== false;
        container.innerHTML += `
            <div class="flex items-center justify-between p-3 bg-brand-darkInput border border-gray-800 rounded-lg">
                <div class="flex-1 pr-2">
                    <span class="font-bold text-sm text-white block">${prod.nombre}</span>
                    <span class="text-xs text-amber-400 font-bold">$${prod.precio.toLocaleString()}</span>
                </div>

                <div class="flex items-center gap-1.5">
                    <button onclick="cambiarPrecioProducto('${prod.idFirebase}', ${prod.precio})" class="bg-neutral-700 hover:bg-neutral-600 text-amber-400 p-1.5 rounded text-xs font-bold transition" title="Cambiar precio">
                        ✏️ $
                    </button>
                    <button onclick="editarProductoCompleto('${prod.idFirebase}')" class="bg-neutral-700 hover:bg-neutral-600 text-white p-1.5 rounded text-xs font-bold transition" title="Editar producto">
                        📝
                    </button>
                    <button onclick="borrarProducto('${prod.idFirebase}', '${prod.nombre.replace(/'/g, "\\'")}')" class="bg-red-600/20 hover:bg-red-600 text-red-400 hover:text-white p-1.5 rounded text-xs font-bold transition border border-red-500/30" title="Borrar producto">
                        🗑️
                    </button>
                    <input type="checkbox" ${disponible ? 'checked' : ''} onchange="toggleDisponibilidad('${prod.idFirebase}', ${disponible})" class="w-5 h-5 accent-brand-yellow rounded cursor-pointer ml-1" title="Pausar / Activar stock">
                </div>
            </div>
        `;
    });
}

function toggleDisponibilidad(idFirebase, estadoActual) {
    db.collection("menu").doc(idFirebase).update({
        disponible: !estadoActual
    }).then(() => {
        if (isAdminLoggedIn) renderAdminStock();
        renderProductos();
    }).catch((error) => {
        console.error("Error al actualizar disponibilidad: ", error);
    });
}

// BORRAR PEDIDO
function borrarPedido(idFirebase) {
    if (confirm("¿Estás seguro de eliminar este pedido de la comandera?")) {
        db.collection("pedidos").doc(idFirebase).delete().then(() => {
            console.log("Pedido eliminado correctamente.");
        }).catch((error) => {
            console.error("Error al eliminar el pedido:", error);
            alert("No tienes permisos o ocurrió un error al borrar.");
        });
    }
}

// --- EDICIÓN INTERACTIVA DE PEDIDOS DESDE LA COMANDERA ---
function modificarPedido(idFirebase) {
    const pedido = pedidos.find(p => p.idFirebase === idFirebase);
    if (!pedido) return;

    pedidoEnEdicionId = idFirebase;
    pedidoEnEdicionItems = JSON.parse(JSON.stringify(pedido.items || []));

    const elNroOrden = document.getElementById('edit-nro-orden');
    if (elNroOrden) elNroOrden.innerText = `(${pedido.numeroOrden || 'ORD'})`;

    const elCliente = document.getElementById('edit-cliente');
    if (elCliente) elCliente.value = pedido.cliente || "";

    const elDireccion = document.getElementById('edit-direccion');
    if (elDireccion) elDireccion.value = pedido.direccion || "";

    const elNotas = document.getElementById('edit-notas');
    if (elNotas) elNotas.value = pedido.notas || "";

    const selectMenu = document.getElementById('select-agregar-item');
    if (selectMenu) {
        selectMenu.innerHTML = `<option value="" disabled selected>+ Agregar producto...</option>`;
        menu.forEach(prod => {
            selectMenu.innerHTML += `<option value="${prod.idFirebase}">${prod.nombre} ($${prod.precio.toLocaleString()})</option>`;
        });
    }

    renderizarItemsEdicionModal();
    
    const modalEditar = document.getElementById('modal-editar-pedido');
    if (modalEditar) {
        modalEditar.classList.remove('hidden');
    }
}

function cerrarModalEditarPedido() {
    const modalEditar = document.getElementById('modal-editar-pedido');
    if (modalEditar) modalEditar.classList.add('hidden');
    pedidoEnEdicionId = null;
    pedidoEnEdicionItems = [];
}

function cambiarCantidadItemEdicion(index, cambio) {
    pedidoEnEdicionItems[index].cantidad += cambio;
    if (pedidoEnEdicionItems[index].cantidad <= 0) {
        pedidoEnEdicionItems.splice(index, 1);
    }
    renderizarItemsEdicionModal();
}

function agregarItemEdicion(selectElement) {
    const idFirebase = selectElement.value;
    if (!idFirebase) return;

    const productoMenu = menu.find(m => m.idFirebase === idFirebase);
    if (!productoMenu) return;

    const existente = pedidoEnEdicionItems.find(i => i.idFirebase === idFirebase || i.nombre === productoMenu.nombre);
    if (existente) {
        existente.cantidad += 1;
    } else {
        pedidoEnEdicionItems.push({
            idFirebase: productoMenu.idFirebase,
            nombre: productoMenu.nombre,
            precio: productoMenu.precio,
            cantidad: 1
        });
    }

    selectElement.value = "";
    renderizarItemsEdicionModal();
}

function renderizarItemsEdicionModal() {
    const container = document.getElementById('edit-items-lista');
    if (!container) return;
    container.innerHTML = '';

    let totalCalculado = 0;

    if (pedidoEnEdicionItems.length === 0) {
        container.innerHTML = `<p class="text-gray-500 text-xs italic text-center py-2">No hay ítems en este pedido.</p>`;
        const elTotalVisual = document.getElementById('edit-total-visual');
        if (elTotalVisual) elTotalVisual.innerText = `$0`;
        return;
    }

    pedidoEnEdicionItems.forEach((item, index) => {
        const subtotal = (item.precio || 0) * (item.cantidad || 1);
        totalCalculado += subtotal;

        container.innerHTML += `
            <div class="flex justify-between items-center pt-2 pb-2">
                <div>
                    <h5 class="font-bold text-xs text-white">${item.nombre}</h5>
                    <span class="text-[11px] text-amber-400 font-bold">$${(item.precio || 0).toLocaleString()} c/u</span>
                </div>
                <div class="flex items-center space-x-2">
                    <button type="button" onclick="cambiarCantidadItemEdicion(${index}, -1)" class="w-6 h-6 bg-neutral-800 text-white rounded font-bold text-xs hover:bg-neutral-700">-</button>
                    <span class="text-xs font-bold w-4 text-center text-white">${item.cantidad}</span>
                    <button type="button" onclick="cambiarCantidadItemEdicion(${index}, 1)" class="w-6 h-6 bg-amber-400 text-black rounded font-bold text-xs hover:bg-amber-500">+</button>
                </div>
            </div>
        `;
    });

    const elTotalVisual = document.getElementById('edit-total-visual');
    if (elTotalVisual) elTotalVisual.innerText = `$${totalCalculado.toLocaleString()}`;
}

function guardarEdicionPedidoCompleto() {
    if (!pedidoEnEdicionId) return;

    const clienteInput = document.getElementById('edit-cliente');
    const direccionInput = document.getElementById('edit-direccion');
    const notasInput = document.getElementById('edit-notas');

    const cliente = clienteInput ? clienteInput.value.trim() : "";
    const direccion = direccionInput ? direccionInput.value.trim() : "";
    const notas = notasInput ? notasInput.value.trim() : "";

    if (!cliente) {
        alert("Por favor completa el nombre del cliente.");
        return;
    }

    if (pedidoEnEdicionItems.length === 0) {
        alert("El pedido debe contener al menos un producto.");
        return;
    }

    const totalFinal = pedidoEnEdicionItems.reduce((sum, item) => sum + ((item.precio || 0) * (item.cantidad || 1)), 0);

    db.collection("pedidos").doc(pedidoEnEdicionId).update({
        cliente: cliente,
        direccion: direccion,
        notas: notas,
        items: pedidoEnEdicionItems,
        total: totalFinal,
        modificado: true // 👈 Marca distintiva para la comandera
    }).then(() => {
        cerrarModalEditarPedido();
        alert("¡Pedido actualizado con éxito!");
    }).catch((error) => {
        console.error("Error al actualizar el pedido:", error);
        alert("Ocurrió un error al actualizar en la base de datos.");
    });
}

function borrarProducto(idFirebase, nombreProducto) {
    if (confirm(`¿Estás seguro de que deseas eliminar permanentemente "${nombreProducto}" del menú?`)) {
        db.collection("menu").doc(idFirebase).delete().then(() => {
            console.log("Producto eliminado del menú.");
            alert("Producto eliminado con éxito.");
        }).catch((error) => {
            console.error("Error al eliminar el producto:", error);
            alert("Ocurrió un error al intentar eliminar el producto.");
        });
    }
}

// RESUMEN DE VENTAS DEL DÍA (Ordenado de mayor a menor venta)
function calcularResumenVentasDia(pedidosArray) {
    let totalRecaudado = 0;
    const conteoItems = {};

    if (!pedidosArray || !Array.isArray(pedidosArray)) return;

    pedidosArray.forEach(pedido => {
        const esCancelado = pedido.estado === 'cancelado' || pedido.cancelado === true;

        if (!esCancelado) {
            totalRecaudado += Number(pedido.total) || 0;

            if (pedido.items && Array.isArray(pedido.items)) {
                pedido.items.forEach(item => {
                    const nombre = item.nombre || 'Producto sin nombre';
                    const cantidad = Number(item.cantidad) || 1;

                    if (!conteoItems[nombre]) {
                        conteoItems[nombre] = 0;
                    }
                    conteoItems[nombre] += cantidad;
                });
            }
        }
    });

    const elTotal = document.getElementById('admin-total-recaudado');
    if (elTotal) {
        elTotal.textContent = `$${totalRecaudado.toLocaleString()}`;
    }

    const elLista = document.getElementById('admin-lista-hamburguesas');
    if (elLista) {
        elLista.innerHTML = '';
        
        const itemsOrdenados = Object.keys(conteoItems)
            .map(nombre => ({ nombre: nombre, cantidad: conteoItems[nombre] }))
            .sort((a, b) => b.cantidad - a.cantidad);

        if (itemsOrdenados.length === 0) {
            elLista.innerHTML = '<li class="text-gray-500 italic">No hay ventas registradas hoy.</li>';
            return;
        }

        itemsOrdenados.forEach(item => {
            const li = document.createElement('li');
            li.className = "flex justify-between border-b border-neutral-800 pb-1 items-center";
            li.innerHTML = `<span class="text-gray-200">🍔 ${item.nombre}</span> <span class="font-bold text-amber-400">${item.cantidad} un.</span>`;
            elLista.appendChild(li);
        });
    }
}

// RENDER DE COMANDERA (Con distinción de pedidos modificados)
function renderAdmin() {
    const container = document.getElementById('pedidos-lista');
    if (!container) return;
    container.innerHTML = '';

    if (pedidos.length === 0) {
        container.innerHTML = `<p class="text-gray-400 text-sm italic py-4">No hay pedidos registrados en la comandera.</p>`;
        return;
    }

    pedidos.forEach(p => {
        let itemsHtml = p.items.map(i => `<li class="text-sm">• ${i.cantidad}x ${i.nombre} ($${(i.precio * i.cantidad).toLocaleString()})</li>`).join('');
        const numeroOrdenMostrado = p.numeroOrden || `ORD-${String(p.idOrdenSecuencial || 1).padStart(4, '0')}`;

        const esModificado = p.modificado === true;
        const claseBorde = esModificado ? 'border-blue-500 shadow-blue-900/20 shadow-lg' : 'border-brand-yellow/30';
        const badgeModificado = esModificado ? `<span class="bg-blue-600/30 text-blue-400 border border-blue-500/40 text-[10px] px-2 py-0.5 rounded font-bold uppercase ml-2">⚠️ Modificado</span>` : '';

        container.innerHTML += `
            <div class="bg-brand-darkCard border ${claseBorde} rounded-xl p-4 space-y-3 relative">
                <div class="absolute top-4 right-4 flex gap-1.5">
                    <button onclick="modificarPedido('${p.idFirebase}')" class="bg-blue-600 hover:bg-blue-700 text-white p-1.5 rounded-lg text-xs transition" title="Modificar pedido">
                        ✏️
                    </button>
                    <button onclick="borrarPedido('${p.idFirebase}')" class="bg-red-600 hover:bg-red-700 text-white p-1.5 rounded-lg text-xs transition" title="Borrar pedido">
                        ❌
                    </button>
                </div>

                <div class="flex justify-between items-start border-b border-gray-800 pb-2 pr-20">
                    <div>
                        <span class="font-oswald text-brand-yellow text-lg font-bold">${numeroOrdenMostrado}</span>
                        <span class="text-xs text-gray-400 ml-2">🕒 ${p.fecha}</span>
                        ${badgeModificado}
                        <h4 class="font-bold text-white text-base">${p.cliente}</h4>
                    </div>
                </div>

                <div class="text-xs text-gray-300 space-y-1">
                    <p><strong>Modalidad:</strong> ${p.tipo}</p>
                    <p><strong>Dirección:</strong> ${p.direccion}</p>
                    <p><strong>Método de pago:</strong> ${p.pago}</p>
                    ${p.notas ? `<p class="text-brand-yellow"><strong>Notas:</strong> ${p.notas}</p>` : ''}
                </div>

                <ul class="bg-brand-darkInput p-2 rounded border border-gray-800 text-gray-200">
                    ${itemsHtml}
                </ul>

                <div class="flex justify-between items-center pt-2">
                    <span class="font-oswald text-xl text-brand-yellow font-bold">Total: $${p.total.toLocaleString()}</span>
                    <button onclick="imprimirTicket('${p.idFirebase}')" class="bg-white hover:bg-gray-200 text-black px-4 py-2 rounded-lg font-bold font-oswald text-xs uppercase flex items-center gap-1 transition">
                        🖨️ Imprimir Comanda
                    </button>
                </div>
            </div>
        `;
    });
}

// Activar Categoría
function activarCategoria(elementoBtn, categoria) {
    const botones = document.querySelectorAll('.cat-btn');
    botones.forEach(btn => {
        btn.style.backgroundColor = "";
        btn.style.color = "";
        btn.classList.remove('bg-amber-400', 'text-black');
        btn.classList.add('bg-neutral-800', 'text-gray-300');
    });

    elementoBtn.classList.remove('bg-neutral-800', 'text-gray-300');
    elementoBtn.style.backgroundColor = "#FBBF24";
    elementoBtn.style.color = "#000000";

    filtrarCategoria(categoria);
}

// GESTIÓN DE PRODUCTOS ADMIN
function abrirModalNuevoProducto() {
    document.getElementById('modal-producto-titulo').innerText = "Agregar Producto";
    document.getElementById('prod-id-firebase').value = "";
    document.getElementById('prod-nombre').value = "";
    document.getElementById('prod-categoria').value = "hamburguesas";
    document.getElementById('prod-precio').value = "";
    document.getElementById('prod-descripcion').value = "";
    document.getElementById('modal-producto').classList.remove('hidden');
}

function cerrarModalProducto() {
    document.getElementById('modal-producto').classList.add('hidden');
}

function cambiarPrecioProducto(idFirebase, precioActual) {
    const nuevoPrecioStr = prompt("Ingrese el nuevo precio para el producto:", precioActual);
    if (nuevoPrecioStr === null) return;

    const nuevoPrecio = Number(nuevoPrecioStr);
    if (isNaN(nuevoPrecio) || nuevoPrecio < 0) {
        alert("Por favor ingrese un número de precio válido.");
        return;
    }

    db.collection("menu").doc(idFirebase).update({
        precio: nuevoPrecio
    }).then(() => {
        console.log("Precio actualizado correctamente.");
    }).catch((error) => {
        console.error("Error al cambiar precio:", error);
        alert("Ocurrió un error al intentar actualizar el precio.");
    });
}

function editarProductoCompleto(idFirebase) {
    const prod = menu.find(p => p.idFirebase === idFirebase);
    if (!prod) return;

    document.getElementById('modal-producto-titulo').innerText = "Editar Producto";
    document.getElementById('prod-id-firebase').value = idFirebase;
    document.getElementById('prod-nombre').value = prod.nombre || "";
    document.getElementById('prod-categoria').value = prod.categoria || "hamburguesas";
    document.getElementById('prod-precio').value = prod.precio || 0;
    document.getElementById('prod-descripcion').value = prod.descripcion || "";
    
    document.getElementById('modal-producto').classList.remove('hidden');
}

function guardarProducto(e) {
    e.preventDefault();

    const idFirebase = document.getElementById('prod-id-firebase').value;
    const nombre = document.getElementById('prod-nombre').value.trim();
    const categoria = document.getElementById('prod-categoria').value;
    const precio = Number(document.getElementById('prod-precio').value);
    const descripcion = document.getElementById('prod-descripcion').value.trim();

    if (!nombre || isNaN(precio)) {
        alert("Por favor completa los campos obligatorios.");
        return;
    }

    const datosProducto = {
        nombre: nombre,
        categoria: categoria,
        precio: precio,
        descripcion: descripcion,
        disponible: true
    };

    if (idFirebase) {
        db.collection("menu").doc(idFirebase).update(datosProducto).then(() => {
            cerrarModalProducto();
        }).catch(err => console.error("Error al actualizar producto:", err));
    } else {
        db.collection("menu").add(datosProducto).then(() => {
            cerrarModalProducto();
        }).catch(err => console.error("Error al crear producto:", err));
    }
}

try {
        // En lugar de hacer un db.collection("pedidos").get(), usamos la cantidad de pedidos en memoria local + 1
        // o si es la vista del cliente, un timestamp corto para asegurar un número único sin leer la BD.
        const numeroSecuencial = (pedidos && pedidos.length > 0) 
            ? Math.max(...pedidos.map(p => p.idOrdenSecuencial || 0)) + 1 
            : 1;

        const numeroOrdenFormateado = "ORD-" + String(numeroSecuencial).padStart(4, '0');

        const ahora = new Date();
        const fechaFormateada = ahora.toLocaleDateString('es-AR');
        const horaFormateada = ahora.toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });
        const fechaCompletaStr = `${fechaFormateada} - ${horaFormateada} hs`;

        const nuevoPedido = {
            id: Date.now(),
            idOrdenSecuencial: numeroSecuencial,
            numeroOrden: numeroOrdenFormateado,
            fecha: fechaCompletaStr,
            cliente: nombre,
            tipo: tipo === 'delivery' ? 'Delivery 🛵' : 'Retiro en local 🛍️',
            direccion: tipo === 'delivery' ? direccion : 'Retira en local',
            pago: pago,
            notas: notas,
            items: [...carrito],
            total: total
        };

        await db.collection("pedidos").add(nuevoPedido);

// Impresión en Comandera Térmica
function imprimirTicket(idFirebase) {
    const p = pedidos.find(item => item.idFirebase === idFirebase);
    if (!p) return;

    let itemsTxt = p.items.map(i => `${i.cantidad}x ${i.nombre.padEnd(20, ' ')} $${(i.precio * i.cantidad).toLocaleString()}`).join('<br>');
    const numeroOrdenMostrado = p.numeroOrden || `ORD-${String(p.idOrdenSecuencial || 1).padStart(4, '0')}`;

    const ticketContent = `
        <div style="text-align: center; border-bottom: 1px dashed #000; padding-bottom: 5px; margin-bottom: 5px;">
            <h2 style="font-size: 16px; font-weight: bold; margin:0;">STATION BAJÓN</h2>
            <p style="font-size: 10px; margin:2px 0;">Villa Lugano - Delivery</p>
            <p style="font-size: 10px; margin:0;">${numeroOrdenMostrado} - ${p.fecha}</p>
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
