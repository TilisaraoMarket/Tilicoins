const coins = [
    {
        nombre: "Tilicoin Básico",
        precio: 9000,
        canje: 10000,
        color: "#4c1d95",
        whatsapp: "573001234567",
        aliasMP: "Marios44"
    },
    {
        nombre: "Tilicoin Premium",
        precio: 18000,
        canje: 20000,
        color: "#6d28d9",
        whatsapp: "573009876543",
        aliasMP: "Marios44"
    },
    {
        nombre: "Tilicoin Gold",
        precio: 45000,
        canje: 50000,
        color: "#fbbf24",
        whatsapp: "573001112233",
        aliasMP: "Marios44"
    },
    {
        nombre: "Tilicoin Silver",
        precio: 27000,
        canje: 30000,
        color: "#94a3b8",
        whatsapp: "573004445566",
        aliasMP: "Marios44"
    },
    {
        nombre: "Verdulería Gold",
        precio: 45000,
        canje: 50000,
        color: "#fbbf24",
        whatsapp: "573009999888",
        aliasMP: "Marios44"
    },
    {
        nombre: "Verdulería Silver",
        precio: 27000,
        canje: 30000,
        color: "#94a3b8",
        whatsapp: "573009999888",
        aliasMP: "Marios44"
    },
    {
        nombre: "Verdulería Bronze",
        precio: 13500,
        canje: 15000,
        color: "#b45309",
        whatsapp: "573009999888",
        aliasMP: "Marios44"
    }
];

// Función para abrir Mercado Pago
function abrirMercadoPago(alias) {
    const ua = navigator.userAgent;
    const isAndroid = /android/i.test(ua);
    const isIOS = /iphone|ipad|ipod/i.test(ua);

    if (isAndroid) {
        window.location.href = `mercadopago://payment/v1/redirect?payment_place=instore&alias=${alias}`;
    } else if (isIOS) {
        window.location.href = `mercadopago://payment?alias=${alias}`;
    } else {
        window.open(`https://www.mercadopago.com.ar/${alias}`, '_blank');
    }
}

function generarImagenMoneda(nombre, precio, canje, color) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = 200;
    canvas.height = 200;
    
    // Círculo base
    ctx.beginPath();
    ctx.arc(100, 100, 90, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
    
    // Texto
    ctx.fillStyle = 'white';
    ctx.font = 'bold 20px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(nombre, 100, 85);
    ctx.font = '16px Arial';
    ctx.fillText(`Precio: $${precio}`, 100, 110);
    ctx.fillText(`Canje: $${canje}`, 100, 130);
    
    return canvas.toDataURL();
}

function mostrarMonedas() {
    const container = document.getElementById('coinsContainer');
    coins.forEach(coin => {
        const card = document.createElement('div');
        card.className = 'coin-card';
        card.innerHTML = `
            <img src="${generarImagenMoneda(coin.nombre, coin.precio, coin.canje, coin.color)}" 
                 alt="${coin.nombre}">
            <h3>${coin.nombre}</h3>
            <div class="coin-price">
                <div>Precio: $${coin.precio.toLocaleString('es-CO')}</div>
                <div>Canje: $${coin.canje.toLocaleString('es-CO')}</div>
            </div>
            <div class="buttons-container">
                <button onclick="abrirMercadoPago('${coin.aliasMP}')" class="mercadopago-btn">
                    <i class="fas fa-shopping-cart"></i>
                    Pagar con Mercado Pago
                </button>
                <a href="https://wa.me/${coin.whatsapp}?text=Quiero%20esta%20moneda%20${encodeURIComponent(coin.nombre)}%20de%20$${coin.precio}" 
                   class="whatsapp-btn" target="_blank">
                    <i class="fab fa-whatsapp"></i>
                    Quiero esta moneda
                </a>
            </div>
        `;
        container.appendChild(card);
    });
}

window.onload = mostrarMonedas;
