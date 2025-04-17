// Simulation control variables
let currentStep = 0;
const totalSteps = 6;

// DOM Elements
const startButton = document.getElementById('startSimulation');
const nextButton = document.getElementById('nextStep');
const resetButton = document.getElementById('resetSimulation');
const payButton = document.getElementById('payButton');
const getReceiptButton = document.getElementById('getReceiptButton');
const paymentConfirmation = document.getElementById('paymentConfirmation');

// Initialize event listeners
startButton.addEventListener('click', startSimulation);
nextButton.addEventListener('click', goToNextStep);
resetButton.addEventListener('click', resetSimulation);

if (payButton) {
    payButton.addEventListener('click', function() {
        paymentConfirmation.classList.remove('hidden');
        payButton.disabled = true;
    });
}

// Simulation functions
function startSimulation() {
    currentStep = 1;
    updateSimulationView();
    startButton.disabled = true;
    nextButton.disabled = false;
    resetButton.disabled = false;
}

function goToNextStep() {
    if (currentStep < totalSteps) {
        currentStep++;
        updateSimulationView();
    }
    
    if (currentStep === totalSteps) {
        nextButton.disabled = true;
    }
}

function resetSimulation() {
    // Hide all steps
    for (let i = 1; i <= totalSteps; i++) {
        const stepElement = document.getElementById(`step${i}`);
        if (stepElement) {
            stepElement.classList.add('hidden');
        }
    }
    
    // Reset payment confirmation if exists
    if (paymentConfirmation) {
        paymentConfirmation.classList.add('hidden');
    }
    
    // Reset pay button if exists
    if (payButton) {
        payButton.disabled = false;
    }
    
    // Reset control buttons
    currentStep = 0;
    startButton.disabled = false;
    nextButton.disabled = true;
    resetButton.disabled = true;
}

// Función para iniciar la simulación automáticamente
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(function() {
        const startButton = document.getElementById('startSimulation');
        if (startButton) {
            startButton.click();
        }
    }, 500);
});

// Función para actualizar la vista
function updateSimulationView() {
    // Ocultar todos los pasos
    for (let i = 1; i <= totalSteps; i++) {
        document.getElementById(`step${i}`).classList.add('hidden');
    }
    
    // Mostrar solo el paso actual
    document.getElementById(`step${currentStep}`).classList.remove('hidden');
    
    // Desplazar al inicio de la sección
    window.scrollTo(0, 0);
}