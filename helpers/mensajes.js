const { resolve } = require('path');

require('colors');

const mostrarMenu = () => {
 
    return new Promise( resolve => {

        console.clear();
        console.log('=================================='.yellow);
        console.log('     Seleccione una opción        '.yellow);
        console.log('==================================\n'.yellow);

        console.log(' ================================='.yellow);
        console.log(`|   1. Crear tarea                |`.blue);
        console.log(`|   2. Listar tareas              |`.yellow);
        console.log(`|   3. Listas tareas completadas  |`.yellow);
        console.log(`|   4. Listas tareas pendientes   |`.yellow);
        console.log(`|   5. Completar tarea(s)         |`.green);
        console.log(`|   6. Borrar tarea               |`.red);
        console.log(`|   0. Salir                      |`.yellow);
        console.log(' =================================\n'.yellow);

        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        });

        readline.question('Seleccione una opción: '.yellow, (opt) => {
            readline.close();
            resolve(opt);
        })

    });

}

const pausa = () => {

    return new Promise( resolve => {
        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        });
    
        readline.question(`\nPresione ${ 'ENTER'.green } para continuar\n`, (opt) => {
            readline.close();
            resolve();
        })
    });
}

module.exports = {
    mostrarMenu,
    pausa
}