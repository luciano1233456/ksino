import { elements } from "./functions/dom.js";
import { registerEvents } from "./functions/events.js";

/**
 * Punto de entrada del renderer
 */
function init() {
  registerEvents(elements);
}

// Inicializa cuando el DOM está listo
document.addEventListener("DOMContentLoaded", init);
