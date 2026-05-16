// Importar módulos principales de Electron para manejo de ventanas y menú
import { BrowserWindow, Menu } from "electron/main";

// Importar módulos nativos de Node.js
import path from "node:path";
import { fileURLToPath } from "node:url";

// Reemplazar __dirname para compatibilidad con ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Crear y configurar la ventana principal de la aplicación
export function createWindow() {
  const win = new BrowserWindow({
    // Definir dimensiones iniciales de la ventana
    width: 900,
    height: 650,

    // Activar o desactivar el frame nativo de la ventana
    frame: true,

    // Definir icono de la aplicación
    icon: path.join(__dirname, "../assets/icons/favicon.ico"),

    // Activar o desactivar inicio en modo pantalla completa
    fullscreen: false,

    // Configurar preferencias del proceso renderer
    webPreferences: {
      // Definir archivo preload para exponer APIs seguras
      preload: path.join(__dirname, "../preload/index.cjs"),

      // Aislar contexto entre preload y renderer (seguridad)
      contextIsolation: true,

      // Activar herramientas de desarrollo (desactivar en build final)
      devTools: true,
    },
  });

  // Definir template (Array) para un menú personalizado de la ventana
  /* const template = [
    {
      label: "Archivo",
      submenu: [
        { role: "quit" }
      ]
    }
  ]; */

  // Convertir el template (Array) en un menú de Electron
  /* const menu = Menu.buildFromTemplate(template); */

  // Eliminar el menú nativo o aplicar un menú personalizado
  /* Menu.setApplicationMenu(null); */

  // Bloquear atajos para abrir DevTools (usar en producción)
  /* win.webContents.on("before-input-event", (event, input) => {
    if (
      (input.control && input.shift && input.key.toLowerCase() === "i") ||
      input.key === "F12"
    ) {
      event.preventDefault();
    }
  }); */

  // Cargar archivo HTML principal del renderer
  win.loadFile("src/renderer/pages/index.html");

  // Retornar instancia de la ventana creada
  return win;
}
