// Importar constructor de base de datos SQLite
import Database from "better-sqlite3";

// Importar módulo de Electron para acceder a rutas del sistema
import { app } from "electron";

// Importar utilidades para manejo de rutas del sistema
import path from "path";

// Importar Picocolors para colorear logs en consola
import pc from "picocolors";

// Definir variable para almacenar la instancia única de la BD
let db;

/**
 * Inicializar la base de datos
 * - Crear instancia única (singleton)
 * - Definir ruta persistente usando userData
 */
export function initDatabase() {

  // Evitar reinicializar la BD si ya existe
  if (db) return db;

  // Construir ruta del archivo de la base de datos
  const dbPath = path.join(app.getPath("userData"), "personajes.db");

  // Mostrar ruta de la BD en consola
  console.log(pc.green("DB path:"), pc.blue(dbPath));

  // Crear instancia de la base de datos SQLite
  db = new Database(dbPath);

  // Retornar instancia creada
  return db;
}

/**
 * Obtener instancia activa de la base de datos
 * - Lanzar error si la BD no ha sido inicializada
 */
export function getDB() {

  // Validar que la BD haya sido inicializada previamente
  if (!db) {
    throw new Error("DB no inicializada. Llama initDatabase()");
  }

  // Retornar instancia existente
  return db;
}
