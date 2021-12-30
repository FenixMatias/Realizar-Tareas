
require('colors');
const { guardarDB, leerDB } = require('./helpers/guardarArchivo');
const { inquirerMenu,
        pausa,
        leerInput,
        listadoTareasBorrar,
        confirmar,
        mostrarListadoCheklist } = require('./helpers/inquirer');
const Tarea = require('./models/tarea');
const Tareas = require('./models/tareas');
//const { mostrarMenu, pausa } = require('./helpers/mensajes');

console.clear();

const main = async() => {

    let opt = '';
    const tareas = new Tareas();
    const tareasDB = leerDB();

    if (tareasDB) {
        //Establecer las tareas
        tareas.cargarTareasFromArray(tareasDB);
    }

    do {
        //Imprime el menu
        opt = await inquirerMenu();

        switch (opt) {
            case '1':
                
                const desc = await leerInput('Descripción: ');
                tareas.crearTarea(desc);

                console.log();
                console.log('========================================='.yellow);
                console.log('     Tarea creada correctamente!      '.yellow);
                console.log('==========================================\n'.yellow);

            break;

            case '2':
                tareas.listadoCompleto();
            break;

            case '3':
                tareas.listarPendientesCompletadas(true);
            break;

            case '4':
                tareas.listarPendientesCompletadas(false);
            break;

            case '5':
                const ids = await mostrarListadoCheklist(tareas.listadoArr);
                tareas.toggleCompletadas(ids);
            break;

            case '6':
                const id = await listadoTareasBorrar(tareas.listadoArr);

                if (id !== '0') {
                    const ok = await confirmar('¿Estas seguro de eliminar la tarea?'.red);

                    if (ok) {
                        tareas.borrarTarea(id);
                        console.log();
                        console.log('========================================='.yellow);
                        console.log('     Tarea eliminada correctamente!      '.yellow);
                        console.log('==========================================\n'.yellow);
                    }
                }
            break;

            case '0':
                
            break;
        
        }

        guardarDB(tareas.listadoArr);

        await pausa();

    } while (opt !== '0' );

    //pausa();*/

}

main();