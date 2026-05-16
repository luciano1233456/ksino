// Importar función para obtener la instancia activa de la base de datos
import { getDB } from "./database.js";

// Importar Picocolors para colorear logs en consola
import pc from "picocolors";

/**
 * Ejecutar migraciones de la base de datos
 * - Crear tablas necesarias si no existen
 * - Preparar la estructura inicial de la BD
 */
export function runMigrations() {

  // Obtener instancia de la base de datos
  const db = getDB();

  // Crear tabla personajes si aún no existe
  db.prepare(`
    CREATE TABLE IF NOT EXISTS personajes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nombre TEXT NOT NULL,
      edad INTEGER
    )
  `).run();

  // Mostrar mensaje de confirmación en consola
  console.log(pc.green("BD lista y preparada..."));
}
