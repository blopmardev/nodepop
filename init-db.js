// Inicializar la BBDD con los datos mínimos para funcionar
const readline = require('readline');

// Cargamos los modelos

const Ad = require('./models/Ad');

async function main(){
    // Preguntar si está seguro de inializar BBDD
    const confirmDel = await question(`Esta operación no se puede deshacer. ¿Está seguro de que desea borrar la base de datos?\n Pulsar [n] para NO y [s] para SÍ\n`)
    if(!confirmDel){
        process.exit();
    }

    // Conectar a la BBDD
    const connection = require('./lib/connectMongoose')

    // Inicializar la colección de anuncios
    await initAds();

    // Desconectar de la BBDD
    connection.close();
}

main().catch(err => console.log('Se ha producido un error', err));

async function initAds(){
    // Borrar todos los documentos de la colección de anuncios
    const deletedAds =  await Ad.deleteMany();
    console.log(`Se han eliminado ${deletedAds.deletedCount} anuncios.`);
    
    // Crear anuncios por defecto

    const defaultAds = await Ad.insertMany([
        {name: "iphone", sale: true, price: 300, image: "iphone-11.jpg", tag: ["mobile"]},
        {name: "bike", sale: false, price: 500, image: "bicicleta-paseo.jpg", tag: ["lifestyle"]},
        {name: "taladradora", sale: false, price: 450, image: "taladro.jpg", tag: ["work"]},
        {name: "coche", sale: true, price: 10000, image: "coche.jpg", tag: ["motor"]},
        {name: "vestido", sale: true, price: 40, image: "vestido.jpg", tag: ["lifestyle"]}
    ]);
    console.log(`Se han creado ${defaultAds.length} anuncios.`)
}

function question(texto){
    return new Promise((resolve, reject) =>{
        const interface = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        })
        interface.question(texto, respuesta => {
            interface.close();
            if(respuesta.toLowerCase() === 's'){
                resolve(true);
                return;
            }
            resolve(false)
        })
    })
}