import { elements } from "./functions/dom.js";
import { setAppInfo,setAppAuthor, pingMain } from "./functions/info.js";

/**
 * Punto de entrada del renderer
 */
function init() {
  setAppInfo(elements.info);
  setAppAuthor(elements.spanAuthor);
  pingMain();
}

// Inicializa cuando el DOM está listo
document.addEventListener("DOMContentLoaded", init);
