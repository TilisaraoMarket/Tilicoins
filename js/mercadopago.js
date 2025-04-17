// Agregar esta función antes de abrirMercadoPago
function detectarDispositivo() {
    const ua = navigator.userAgent;
    return {
        android: /android/i.test(ua),
        ios: /iphone|ipad|ipod/i.test(ua)
    };
}

function abrirMercadoPago(alias) {
    const dispositivo = detectarDispositivo();
    
    // URLs específicas para Mercado Pago
    if (dispositivo.android) {
        window.location.href = `mercadopago://payment/v1/redirect?payment_place=instore&alias=${alias}`;
        setTimeout(() => {
            window.location.href = 'market://details?id=com.mercadopago.wallet';
        }, 1500);
    } else if (dispositivo.ios) {
        window.location.href = `mercadopago://payment?alias=${alias}`;
        setTimeout(() => {
            window.location.href = 'https://apps.apple.com/ar/app/mercado-pago/id925436649';
        }, 1500);
    } else {
        window.open(`https://www.mercadopago.com.ar/payment-link/${alias}`, '_blank');
    }
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
                <button onclick="abrirMercadoPago('${coin.aliasMP}')" class="btn mercadopago-btn">
                    <i class="fas fa-shopping-cart"></i>
                    Pagar con Mercado Pago
                </button>
                <a href="https://wa.me/${coin.whatsapp}?text=Quiero%20esta%20moneda%20${encodeURIComponent(coin.nombre)}%20de%20$${coin.precio}" 
                   class="btn whatsapp-btn" target="_blank">
                    <i class="fab fa-whatsapp"></i>
                    Quiero esta moneda
                </a>
            </div>
        `;
        container.appendChild(card);
    });
}