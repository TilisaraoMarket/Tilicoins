// Función para iniciar la simulación automáticamente
document.addEventListener('DOMContentLoaded', function() {
    // Esperar un breve momento para asegurar que todos los elementos están cargados
    setTimeout(function() {
        // Obtener el botón de inicio y activarlo automáticamente
        const startButton = document.getElementById('startSimulation');
        if (startButton) {
            startButton.click();
        }
    }, 500);
});