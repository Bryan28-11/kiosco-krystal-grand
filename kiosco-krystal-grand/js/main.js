// === main.js ===
// Lógica general del kiosco: reloj y navegación entre secciones

// Reloj en la barra superior
function actualizarReloj(){
  const ahora = new Date();
  const horas = String(ahora.getHours()).padStart(2, '0');
  const minutos = String(ahora.getMinutes()).padStart(2, '0');
  document.getElementById('clock').textContent = `${horas}:${minutos}`;
}
actualizarReloj();
setInterval(actualizarReloj, 1000 * 30);

// Navegación: cada tarjeta del menú lleva a su propia página
document.querySelectorAll('.card').forEach(card => {
  card.addEventListener('click', () => {
    const destino = card.dataset.target;
    window.location.href = `pages/${destino}.html`;
  });
});
