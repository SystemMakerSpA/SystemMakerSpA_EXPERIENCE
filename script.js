// script.js
// Puedes agregar interactividad aquí

document.addEventListener('DOMContentLoaded', function() {
    const ingenieros = document.querySelectorAll('.ingeniero');
    ingenieros.forEach(ingeniero => {
        ingeniero.addEventListener('mouseenter', () => {
            ingeniero.style.background = '#d1e7dd';
        });
        ingeniero.addEventListener('mouseleave', () => {
            ingeniero.style.background = '#f9fafb';
        });
    });
});
