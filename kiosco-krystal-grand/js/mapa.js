// === mapa.js ===
// Carga las zonas desde data/zonas.json y dibuja los marcadores sobre el mapa

const contenedor = document.getElementById('mapaContenedor');
const infoPanel = document.getElementById('infoPanel');
const infoOverlay = document.getElementById('infoOverlay');
const infoTipo = document.getElementById('infoTipo');
const infoNombre = document.getElementById('infoNombre');
const infoDesc = document.getElementById('infoDesc');
const infoCerrar = document.getElementById('infoCerrar');

const ETIQUETAS_TIPO = {
  servicio: 'Servicio',
  restaurante: 'Restaurante',
  bar: 'Bar',
  alberca: 'Alberca',
  actividad: 'Actividad'
};

function abrirInfo(nombre, tipo, descripcion){
  infoTipo.textContent = ETIQUETAS_TIPO[tipo] || 'Información';
  infoNombre.textContent = nombre;
  infoDesc.textContent = descripcion;
  infoPanel.classList.add('activo');
  infoOverlay.classList.add('activo');
}

function cerrarInfo(){
  infoPanel.classList.remove('activo');
  infoOverlay.classList.remove('activo');
}

infoCerrar.addEventListener('click', cerrarInfo);
infoOverlay.addEventListener('click', cerrarInfo);

function crearMarcador({x, y}, claseExtra, contenidoHTML, onClick){
  const marcador = document.createElement('div');
  marcador.className = `marcador ${claseExtra}`;
  marcador.style.left = `${x}%`;
  marcador.style.top = `${y}%`;
  marcador.innerHTML = contenidoHTML;
  if (onClick) marcador.addEventListener('click', onClick);
  contenedor.appendChild(marcador);
}

fetch('../data/zonas.json')
  .then(res => res.json())
  .then(datos => {

    // Puntos numerados principales (1-20)
    datos.zonas.forEach(zona => {
      crearMarcador(
        zona,
        `marcador--${zona.tipo}`,
        zona.id,
        () => abrirInfo(zona.nombre, zona.tipo, zona.descripcion)
      );
    });

    // Extras: sanitarios y punto romántico
    datos.extras.forEach(extra => {
      const icono = extra.tipo === 'romantico' ? '♥' : '🚻';
      crearMarcador(
        extra,
        `marcador--${extra.tipo}`,
        icono,
        () => abrirInfo(extra.nombre, extra.tipo, extra.tipo === 'romantico'
          ? 'Un rincón especial frente al mar, ideal para una foto o un momento romántico.'
          : 'Sanitarios disponibles para huéspedes.')
      );
    });

  })
  .catch(err => console.error('No se pudieron cargar las zonas del mapa:', err));
