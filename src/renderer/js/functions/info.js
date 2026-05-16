/**
 * Maneja la información mostrada en la UI
 */

export function setAppInfo(infoElement) {
  infoElement.innerHTML =
    `Esta aplicación está usando <i class="text-bold">Chrome (v${window.versions.chrome()})</i>, <i class="text-bold">Node.js (v${window.versions.node()})</i>, <i class="text-bold">Electron (v${window.versions.electron()})</i>.`;
}


export function setAppAuthor(infoElement) {
  infoElement.innerText =
    `${window.dates.author}.`;
}

/**
 * Ejemplo de comunicación IPC asincrónica
 */
export async function pingMain() {
  const response = await window.dates.ping();
  console.log(response); // 'pong'
}
