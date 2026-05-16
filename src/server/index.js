// Importar función para inicializar la base de datos
import { initDatabase } from "./database.js";

// Importar función para ejecutar migraciones de la base de datos
import { runMigrations } from "./migrate.js";

// Importar Picocolors para colorear logs en consola
import pc from "picocolors";

/**
 * Inicializar el backend de la aplicación
 * - Inicializar la conexión a la base de datos
 * - Ejecutar las migraciones necesarias
 */
export function initServer() {

  // Inicializar la base de datos
  initDatabase();

  // Ejecutar migraciones y preparar la estructura de la BD
  runMigrations();

  // Mostrar mensaje de confirmación en consola
  console.log(pc.green("Backend inicializado..."));
}
