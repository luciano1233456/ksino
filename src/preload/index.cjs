// Importar módulos necesarios de Electron para comunicación segura IPC
const { contextBridge, ipcRenderer } = require("electron");

/**
 * ======================
 * API DE VERSIONES
 * ======================
 */

// Definir API para exponer versiones del entorno
const versionsAPI = {
  // Obtener versión de Node.js
  node: () => process.versions.node,

  // Obtener versión de Chromium
  chrome: () => process.versions.chrome,

  // Obtener versión de Electron
  electron: () => process.versions.electron,
};

/**
 * ======================
 * API DE DATOS GENERALES
 * ======================
 */

// Definir API para datos generales y utilidades
const datesAPI = {
  // Ejecutar ping IPC para pruebas de comunicación
  ping: () => ipcRenderer.invoke("ping"),

  // Definir autor de la aplicación
  author: "Samuel Dzib López (DZEL21S)",
};

/**
 * ======================
 * API DE VENTANA
 * ======================
 */

// Definir API para control de la ventana
const windowAPI = {
  // Alternar modo pantalla completa
  toggleFullscreen: () => ipcRenderer.send("toggle-fullscreen"),
};

/**
 * ======================
 * API DE LA APLICACIÓN
 * ======================
 */

// Definir API para acciones globales de la app
const electronAPI = {
  // Solicitar cierre de la aplicación
  closeApp: () => ipcRenderer.invoke("app:close"),
};

/**
 * ======================
 * API DEL SERVER
 * ======================
 */

// Definir API para comunicación con el backend vía IPC
const ServerAPIs = {
  personajes: {
    // Crear un personaje
    create: (data) => ipcRenderer.invoke("personajes:create", data),

    // Obtener lista de personajes
    read: () => ipcRenderer.invoke("personajes:read"),

    // Actualizar un personaje
    update: (data) => ipcRenderer.invoke("personajes:update", data),

    // Eliminar un personaje
    delete: (id) => ipcRenderer.invoke("personajes:delete", id),
  }
};

/**
 * ======================
 * EXPOSICIÓN SEGURA AL RENDERER
 * ======================
 */

// Exponer API de versiones al contexto del renderer
contextBridge.exposeInMainWorld("versions", versionsAPI);

// Exponer API de datos generales al contexto del renderer
contextBridge.exposeInMainWorld("dates", datesAPI);

// Exponer API de control de ventana al contexto del renderer
contextBridge.exposeInMainWorld("windowAPI", windowAPI);

// Exponer API de control de la aplicación al contexto del renderer
contextBridge.exposeInMainWorld("electronAPI", electronAPI);

// Exponer API del backend al contexto del renderer
contextBridge.exposeInMainWorld("electron", ServerAPIs);
