// Importar módulos principales de Electron para IPC y control de la aplicación
import { app, BrowserWindow, ipcMain } from "electron/main";

// Importar servicios del backend (lógica de negocio)
import { createPersonaje, getPersonajes, updatePersonaje, deletePersonaje } from "../server/services/personajes.service.js";

// Importar librería para colorear logs en consola
import pc from "picocolors";

// Registrar todos los handlers y listeners IPC
export function registerIpcHandlers() {

  // Registrar handler de prueba para verificar comunicación IPC
  ipcMain.handle("ping", () => {
    return "pong";
  });

  // Registrar handler para cerrar completamente la aplicación
  ipcMain.handle("app:close", () => {
    app.quit();
  });

  // Registrar listener para alternar modo pantalla completa
  ipcMain.on("toggle-fullscreen", () => {
    const win = BrowserWindow.getFocusedWindow();
    if (win) {
      win.setFullScreen(!win.isFullScreen());
    }
  });

  // ======================
  // BACKEND - PERSONAJES
  // ======================

  // Registrar handler para crear un personaje
  ipcMain.handle("personajes:create", (_e, data) => {
    return createPersonaje(data);
  });

  // Registrar handler para obtener todos los personajes
  ipcMain.handle("personajes:read", () => {
    return getPersonajes();
  });

  // Registrar handler para actualizar un personaje
  ipcMain.handle("personajes:update", (_e, data) => {
    return updatePersonaje(data);
  });

  // Registrar handler para eliminar un personaje
  ipcMain.handle("personajes:delete", (_e, id) => {
    return deletePersonaje(id);
  });

  // Mostrar log indicando que los handlers IPC fueron cargados
  console.log(pc.green("IPC handlers cargados..."));
}
