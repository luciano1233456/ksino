# Documentación y uso de Electron App Template + Server (`v2.0.1`)

**¡Gracias por descargar y utilizar este proyecto personal!**

Este proyecto está diseñado para generar y empaquetar **Aplicaciones Web** y convertirlas en **Aplicaciones Nativas** utilizando **Electron**.

``Electron App Template`` permite la creación de  **Aplicaciones nativas** ***con*** o ***sin Backend Local***, ofreciendo soporte opcional para un ***Server local*** (``API interna`` + ``base de datos``).

Esta documentación te llevará **desde cero** hasta obtener un ``.exe`` **instalable** utilizando **Electron** y **electron-builder (NSIS)** a partir de este **template**.

---

## Requisitos

- La **aplicación** debe desarrollarse utilizando:
  - ``HTML``.
  - ``CSS``.
  - ``JavaScript``.

- El proceso de ***build*** debe ejecutarse en:
  - ***Windows 10***.
  - ***Windows 11***.

- Tener instalado **Node.js**.

Para verificar la instalación:

~~~bash
node -v
npm -v
~~~

- Tener instalado **Git** (opcional, pero recomendado).

---

## Estructura de Proyecto

`Electron App Template` utiliza una **estructura modular** y **escalable** inspirada en stacks modernos como ***React*** y ***Next.js***, pero manteniendo ``HTML``, ``CSS`` y ``JavaScript`` puro:

~~~bash
electron-app-template/
│
├── src/
│   ├── main/                   # Proceso principal (Electron)
│   │   ├── index.js            # Punto de entrada del proceso main
│   │   ├── createWindow.js     # Creación y configuración de ventanas
│   │   └── ipc.js              # Comunicación IPC (main ↔ renderer)
│   │
│   ├── preload/                # Preload (puente seguro)
│   │   └── index.cjs           # APIs expuestas al renderer
│   │
│   ├── renderer/               # Interfaz de usuario (Frontend)
│   │   ├── assets/             # Archivos estaticos publicos
│   │   │   ├── icons/          # Iconos SVG
│   │   │   │   └── *.svg       
│   │   │   │
│   │   │   └── images/         # Imágenes
│   │   │       └── *.png       
│   │   │
│   │   ├── pages/              # Archivos .html de paginas
│   │   │   ├── index.html      # Página principal
│   │   │   └── about.html      # Página secundaria (ej. About)
│   │   │
│   │   ├── js/                 # JavaScript del renderer
│   │   │   ├── functions/      # Funciones individuales de JS
│   │   │   │   ├── dom.js      # Funciones relacionadas con el DOM
│   │   │   │   ├── events.js   # Funciones relacionadas con eventos y listeners
│   │   │   │   └── info.js     # Funciones de renderizado de información
│   │   │   │   
│   │   │   ├── globals.js      # Lógica global compartida
│   │   │   └── index.js        # Lógica específica de index.html
│   │   │
│   │   └── styles/             # Estilos CSS
│   │       └── globals.css     # Estilos globales
│   │
│   ├── assets/                 # Recursos estáticos
│   │   └── icons/
│   │       └── favicon.ico     # Icono de la aplicación
│   │
│   └── server/                 # Proceso de server (Backend)
│       ├── services/           # Servicios API backend
│       │   └── *.service.js
│       │ 
│       ├── database.js         #  Funcines para BD
│       ├── migrate.js          #  Inicialización y preparación de BD
│       └── index.js            #  Punto de entrada del Backend
│
├── dist/                       # Salida del build (generado)
│   └── *.exe                   # Instalador para Windows
│
├── package.json                # Configuración del proyecto y build
├── package-lock.json           # Lock de dependencias
├── .gitignore                  # Archivos ignorados por Git
└── README.md                   # Documentación del proyecto
~~~

Donde:

- ``main/`` :Controla el ciclo de vida de la App, ***ventanas***, ***IPC*** y ***comportamiento nativo***.
- ``preload/`` :Expone ***APIs seguras*** al renderer usando ``contextBridge``.
- ``renderer/`` :Contiene toda la **interfaz visual** (``HTML``, ``CSS`` y ``JS``).
- ``assets/`` :Archivos estáticos como ***iconos*** e **imágenes**.
- ``dist/`` :Carpeta generada automáticamente al ejecutar el ***build*** (``npm run build``).
- ``server/`` :Funcionalidad del ***Backend***.

---

## Paso 1. Descargar este repositorio

Clona el **repositorio** en tu equipo:

~~~bash
git clone https://github.com/SamuelDzibLopez/ElectronAppTemplate
~~~

***Nota:*** Una vez descargado el **repositorio**, trabaja siempre dentro del directorio del proyecto.

---

## Paso 2. Instalar dependencias necesarias

Ejecuta el siguiente **comando**:

~~~bash
npm install
~~~

**Nota:** Este comando instalará automáticamente **todas las dependencias necesarias** tanto para **desarrollo** como para el ***build*** final.

---

## Paso 3. Visualizar la aplicación en desarrollo

Para ejecutar la aplicación en **modo desarrollo**:

~~~bash
npm start
~~~

**Nota:** Este comando abrirá la aplicación en una **ventana nativa de Electron**.

Aquí podrás ***modificar*** y ***desarrollar*** tu aplicación usando ``HTML``, ``CSS`` y ``JavaScript``.

***Nota:*** Si su ***App*** a crear no necesita de un ***BackEnd***, puede eliminar el directorio `server/` y la invocación de la función `initServer()` encontrada en  `main/index.js`. junto con sus dependencias necesarias, tales como `better-sqlite3`.

---

## Paso 4. Preparar el proyecto para generar el instalador (``.exe``)

### 4.1. Modificar metadatos

Antes de generar el **instalador**, es necesario modificar algunos **metadatos** importantes en el archivo `package.json`.

Actualiza los siguientes campos con la información de tu **aplicación**:

~~~json
"name": "electron-app-template",
"description": "Descripción de tu aplicación",
"author": "TU NOMBRE O EMPRESA AQUÍ",
"build.appId": "com.tudominio.tuapp",
"build.productName": "Nombre de tu aplicación",
"build.copyright": "Copyright © AÑO TU NOMBRE"
"nsis.shortcutName": "Nombre de tu aplicación"
~~~

---

### 4.2. Agregar favicon.ico

Para que tu aplicación tenga **icono** en:

- El archivo `.exe`.
- El instalador.
- El acceso directo.
- La ventana de la aplicación.

Debes generar un archivo **favicon.ico** válido.

Puedes hacerlo desde la siguiente página:

<a href="https://www.icoconverter.com/" target="_blank" rel="noopener noreferrer">
  https://www.icoconverter.com/
</a>

</br>

Al generar el `.ico`, asegúrate de seleccionar:

- Todos los tamaños disponibles.
- ``256 px (only works with 32 bits)`` (obligatorio).
- ``32 bits (16.7M colors & alpha transparency)``.

Luego, **reemplaza** el archivo:


`src/assets/icons/favicon.ico`


por tu **icono personalizado**.

**Nota:** El archivo debe llamarse exactamente `favicon.ico`.

**El `package.json` ya está configurado para usar este icono automáticamente.**

---

### 4.3. Personalizar Ventana de Aplicación para Build

Una vez ya terminado nuestro desarrollo, podemos ***Activar/Desactivar*** algunas **configuraciones de ventana**, las cuales son utiles en desarrollo, pero en nuestra versión final ***Build***, desactivarlos tendra una mejor experiencia de usuario.

Estas configuraciones se encuentran en nuestro archivo:

`/src/main/createWindow.js`.

Puede ***Desactivar/Activar*** las configuraciones a su gusto:

---

#### 4.3.1. Activar/Desactivar barra principal de ventana

~~~js
  const win = new BrowserWindow({
    frame: true, //Activar/Desactivar barra principal de ventana
  });
~~~

***Nota:*** Podemos **activar** o **desactivar** la ***barra principal de la ventana*** de nuestra App (Podemos emular una personalizada dentro de nuestro propio contenido)

---

#### 4.3.2. Activar/Desactivar inicio de ventana FullScreen

~~~js
  const win = new BrowserWindow({
        fullscreen: false, // Activar/Desactivar inicio de ventana FullScreen
  });
~~~

***Nota:*** Podemos **activar** o **desactivar** para que nuestra App inicie con la ***ventana en FullScreen*** en la pantalla. 

---

#### 4.3.3. Activar/Desactivar DevTools

~~~js
  const win = new BrowserWindow({
    webPreferences: {
      devTools: true, //Desactivar en versión final build

    }
  });
~~~

***Nota:*** Las ``devTools`` nos son utiles para el ***debug*** de nuestra App al desarrollarse. pero en la version final para el `build`, es importante desactivarlas (`false`), para una ***mejor seguridad*** y ***UX***.

---

#### 4.3.4. Activar/Desactivar/Personalizar barra de navegación de ventana

~~~js
  //null si desea eliminar el menu navito default o uno personalizado (template)
  Menu.setApplicationMenu(null);
~~~

***Nota:*** Si deseamos desactivar el NavBar de nuestra ventana de la App, debemos ingresar `null`, como parametro de `Menu.setApplicationMenu()`; Si deseamos activar el NavBar por default de la ventana, basta con eliminar este método de `Menu`.

Si deseamos generar un NavBar personalizado, podemos generar un `template`:

~~~js
  // Template (Array) para navbar de ventana  
  const template = [
    {
      label: "Archivo",
      submenu: [
        { role: "quit" }
      ]
    }
  ];

  //Convertir Template (Array) en Menu personalizado
  const menu = Menu.buildFromTemplate(template);

  //Colocar Menu personalizado en ventana
  Menu.setApplicationMenu(menu);
~~~

---

#### 4.3.5. Omitir eventos de Keyboard Shortcuts importantes

~~~js
  // Bloquear Ctrl + Shift + i o F12 (Descomentar para producción)

  win.webContents.on("before-input-event", (event, input) => {
    if (
      (input.control && input.shift && input.key.toLowerCase() === "i") ||
      input.key === "F12"
    ) {
      event.preventDefault();
    }
  });
~~~

***Nota:*** Como medida de ***seguridad***, es importante **activar** este listen de eventos al momento de genera el `build` y ***version final*** de nuestra App.

***Nota:*** Esta parte de código se encuentra **comentado**, puede ***descomentarlo*** en la ***versión final*** de su ***App***.

---

## Paso 5. Generar el instalador (``.exe``)

Una vez terminada tu **aplicación** y configurados los **metadatos**, ejecuta el ***build***:

~~~bash
npm run build
~~~

Al **finalizar el proceso**, se creará una carpeta llamada `dist/`.

Dentro de esta carpeta encontrarás:

- El instalador `.exe`
- La versión empaquetada de la aplicación

Este archivo `.exe` está listo para ser distribuido e instalado en otros equipos con ***Windows***.

---

## Notas finales

- Este template está pensado para ser ***simple***, ***limpio*** y ***escalable***.
- No necesita de ***frameworks externos***.
- Está inspirado en arquitecturas modernas como ***React*** o ***Next.js***, pero construido únicamente con tecnologías web estándar.

Disfruta creando **aplicaciones nativas** con **Electron**.

Realizado por ***DZEL21S***.
