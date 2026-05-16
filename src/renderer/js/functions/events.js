/**
 * Registra todos los eventos de la interfaz
 */

export function registerEvents(elements) {

  // Desactiva menú contextual
  window.addEventListener("contextmenu", (e) => {
    e.preventDefault();
  });

  // Botón fullscreen
  elements.fullscreenBtn.addEventListener("click", () => {
    window.windowAPI.toggleFullscreen();
  });

  // Botón cerrar app
  elements.closeBtn.addEventListener("click", () => {
    window.electronAPI.closeApp();
  });
}
