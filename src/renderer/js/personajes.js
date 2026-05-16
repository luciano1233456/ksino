// Inputs
import { inputs, buttons } from "./functions/dom.js";

// Desestructuración de elementos buttons
const { btnCreate, btnUpdate } = buttons;

const tablaBody = document.getElementById("tabla-personajes");

/* ======================
   RENDER TABLA
====================== */
async function renderTabla() {
  try {
    const personajes = await window.electron.personajes.read();

    tablaBody.innerHTML = "";

    personajes.data.forEach((p) => {
      const fila = document.createElement("tr");

      fila.innerHTML = `
        <td>${p.id}</td>
        <td>${p.nombre}</td>
        <td>${p.edad}</td>
        <td>
          <button class="btn-delete-row" data-id="${p.id}">
            Eliminar
          </button>
        </td>
      `;

      tablaBody.appendChild(fila);
    });

    // Asignar evento a botones eliminar
    document.querySelectorAll(".btn-delete-row").forEach((btn) => {
      btn.addEventListener("click", async (e) => {
        const id = Number(e.target.getAttribute("data-id"));

        await window.electron.personajes.delete(id);

        inputs.output.textContent = `Personaje con ID ${id} eliminado`;

        renderTabla();
      });
    });
  } catch (err) {
    inputs.output.textContent = err.message;
  }
}

/* ======================
   CREATE
====================== */
btnCreate.addEventListener("click", async () => {
  try {
    const personaje = {
      nombre: inputs.inputNombre.value,
      edad: Number(inputs.inputEdad.value),
    };

    const res = await window.electron.personajes.create(personaje);
    inputs.output.textContent = JSON.stringify(res.message, null, 2);

    renderTabla();
  } catch (err) {
    inputs.output.textContent = err.message;
  }
});

/* ======================
   UPDATE
====================== */
btnUpdate.addEventListener("click", async () => {
  try {
    const personaje = {
      id: Number(inputs.inputId.value),
      nombre: inputs.inputNombre.value,
      edad: Number(inputs.inputEdad.value),
    };

    const res = await window.electron.personajes.update(personaje);
    inputs.output.textContent = JSON.stringify(res.message, null, 2);

    renderTabla();
  } catch (err) {
    inputs.output.textContent = err.message;
  }
});

/* Cargar tabla al iniciar */
renderTabla();
