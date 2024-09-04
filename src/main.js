// Importa las funciones de utilidad
import { fetchInput, pause } from "./common/common.js";

const opciones = [
  { opc: 0, nombre: "Salir", accion: false },
  { opc: 1, nombre: "Introduccion al Array", accion: () => import("./introduccion_array/index.js") },
  { opc: 2, nombre: "Introduccion al Constructor", accion: () => import("./introduccion_constructor/index.js") },
  { opc: 3, nombre: "Propiedades estáticas", accion: () => import("./propiedades_estaticas/index.js") },
]

// Menú principal
const menu = async () => {
  let opcion;

  while (true) {
    console.clear();
    console.log("Menú principal:");
    console.log("---------------\n");

    opciones.forEach((option) =>
      console.log(`${option.opc}. ${option.nombre}`)
    );

    opcion = parseInt(await fetchInput("Opción: "), 10);

    if (opcion === 0) {
      process.exit(0);
    }else if (isNaN(opcion) || opcion < 0 || opcion >= opciones.length) {
      console.log("\nOpción inválida. Intente de nuevo.");
    } else {
      const opc_select = opciones.find(op => op.opc === opcion);
      const { submenu } = await opc_select.accion();
      await submenu();
    }

    await pause();
  }
};

// Funcion principal
const main = async () => {
  await menu();
};

// Llama a la función principal
main(); 
