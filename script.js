// script.js
// Navegación dinámica de secciones con botón activo
function showSection(sectionId) {
    const sections = document.querySelectorAll('.dynamic-section');
    sections.forEach(sec => {
        sec.style.display = 'none';
    });
    const active = document.getElementById(sectionId);
    if (active) {
        active.style.display = 'block';
    }
    // Resaltar el botón activo
    const buttons = document.querySelectorAll('.nav-btn');
    buttons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('onclick').includes(sectionId)) {
            btn.classList.add('active');
        }
    });
}

// Inicializar el botón activo al cargar
document.addEventListener('DOMContentLoaded', function() {
    showSection('filosofia');
});
