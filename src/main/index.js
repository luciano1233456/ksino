// Importar módulos principales de Electron (proceso main)
const { autoUpdater } = require('electron-updater');
import { app, BrowserWindow } from "electron/main";

// Importar módulos internos del proceso main
import { createWindow } from "./createWindow.js";
import { registerIpcHandlers } from "./ipc.js";

// Importar Picocolors para colorear logs en consola
import pc from "picocolors";

// Importar función principal para inicializar el backend (server)
import { initServer } from "../server/index.js";

// Inicializar Electron cuando la aplicación esté lista
app.whenReady().then(() => {

  // Comprobar actualizaciones automáticamente
autoUpdater.checkForUpdatesAndNotify();

// Eventos para saber qué pasa (opcional, pero recomendado)
autoUpdater.on('update-available', (info) => {
  console.log('🎮 ¡Hay una nueva versión disponible!');
});

autoUpdater.on('update-downloaded', (info) => {
  console.log('✅ Actualización descargada. Reinicia para aplicarla.');
  autoUpdater.quitAndInstall();
});

autoUpdater.on('error', (err) => {
  console.error('❌ Error al actualizar:', err);
});

  // Inicializar backend (BD, migraciones, servicios)
  initServer();

  // Registrar handlers y listeners IPC (main ↔ renderer)
  registerIpcHandlers();

  // Crear la ventana principal de la aplicación
  createWindow();

  // Escuchar evento de activación (comportamiento típico en macOS)
  app.on("activate", () => {
    // Crear una nueva ventana si no existe ninguna abierta
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// Cerrar la aplicación cuando todas las ventanas se cierren (excepto en macOS)
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    console.log(pc.red("Cerrando App..."))
    app.quit();
  }
});
