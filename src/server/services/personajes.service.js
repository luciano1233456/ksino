// Importación de BD a utilizar
import { getDB } from "../database.js";

/**
 * CREATE
 */
export function createPersonaje({ nombre, edad }) {
  try {
    // Validaciones
    if (!nombre || typeof nombre !== "string") {
      return {
        status: 400,
        ok: false,
        message: "El nombre es obligatorio y debe ser un texto",
        error: null,
      };
    }

    if (edad !== undefined && typeof edad !== "number") {
      return {
        status: 400,
        ok: false,
        message: "La edad debe ser un número",
        error: null,
      };
    }

    const db = getDB();

    const res = db
      .prepare("INSERT INTO personajes (nombre, edad) VALUES (?, ?)")
      .run(nombre.trim(), edad ?? null);

    return {
      status: 201,
      ok: true,
      message: "Personaje creado correctamente",
      data: {
        id: res.lastInsertRowid,
        nombre,
        edad,
      },
    };
  } catch (error) {
    return {
      status: 500,
      ok: false,
      message: "Error interno al crear el personaje",
      error: error.message,
    };
  }
}

/**
 * READ
 */
export function getPersonajes() {
  try {
    const personajes = getDB()
      .prepare("SELECT * FROM personajes")
      .all();

    return {
      status: 200,
      ok: true,
      message: "Personajes obtenidos correctamente",
      data: personajes,
    };
  } catch (error) {
    return {
      status: 500,
      ok: false,
      message: "Error interno al obtener los personajes",
      error: error.message,
    };
  }
}

/**
 * UPDATE
 */
export function updatePersonaje({ id, nombre, edad }) {
  try {
    // Validaciones
    if (!id || typeof id !== "number") {
      return {
        status: 400,
        ok: false,
        message: "ID inválido",
        error: null,
      };
    }

    if (nombre !== undefined && typeof nombre !== "string") {
      return {
        status: 400,
        ok: false,
        message: "El nombre debe ser un texto",
        error: null,
      };
    }

    if (edad !== undefined && typeof edad !== "number") {
      return {
        status: 400,
        ok: false,
        message: "La edad debe ser un número",
        error: null,
      };
    }

    const result = getDB()
      .prepare("UPDATE personajes SET nombre = ?, edad = ? WHERE id = ?")
      .run(nombre, edad ?? null, id);

    if (result.changes === 0) {
      return {
        status: 404,
        ok: false,
        message: "Personaje no encontrado",
        error: null,
      };
    }

    return {
      status: 200,
      ok: true,
      message: "Personaje actualizado correctamente",
      data: { id, nombre, edad },
    };
  } catch (error) {
    return {
      status: 500,
      ok: false,
      message: "Error interno al actualizar el personaje",
      error: error.message,
    };
  }
}

/**
 * DELETE
 */
export function deletePersonaje(id) {
  try {
    if (!id || typeof id !== "number") {
      return {
        status: 400,
        ok: false,
        message: "ID inválido",
        error: null,
      };
    }

    const result = getDB()
      .prepare("DELETE FROM personajes WHERE id = ?")
      .run(id);

    if (result.changes === 0) {
      return {
        status: 404,
        ok: false,
        message: "Personaje no encontrado",
        error: null,
      };
    }

    return {
      status: 200,
      ok: true,
      message: "Personaje eliminado correctamente",
      data: { id },
    };
  } catch (error) {
    return {
      status: 500,
      ok: false,
      message: "Error interno al eliminar el personaje",
      error: error.message,
    };
  }
}
