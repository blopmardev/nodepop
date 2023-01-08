// Inicializar la BBDD con los datos mínimos para funcionar
const readline = require('readline');

// Cargamos los modelos

const Agente = require('./models/Agente');
const Ad = require('./models/Ad');

async function main(){
    // Preguntar si está seguro de inializar BBDD
    const confirmDel = await pregunta(`Esta operación no se puede deshacer. ¿Está seguro de que desea borrar la base de datos?\n Pulsar [n] para NO y [s] para SÍ\n`)
    if(!confirmDel){
        process.exit();
    }

    // Conectar a la BBDD
    const connection = require('./lib/connectMongoose')

    // Inicializar la colección de agentes
    await initAgentes();
    await initAds();

    // Desconectar de la BBDD
    connection.close();
}

main().catch(err => console.log('Se ha producido un error', err));

async function initAds(){
    // Borrar todos los documentos de la colección de anuncios
    const deletedAds =  await Ad.deleteMany();
    console.log(`Se han eliminado ${deletedAds.deletedCount} anuncios.`);
    
    // Crear anuncios iniciales

    const defaultAds = await Ad.insertMany([
        {name: "iphone", on_sale: true, price: 300, image: "https://www.backmarket.es/cdn-cgi/image/format%3Dauto%2Cquality%3D75%2Cwidth%3D260/https://d1eh9yux7w8iql.cloudfront.net/product_images/290060_374aef9d-24fa-4d24-bb8c-f27ce27b711f.jpg", tags: "mobile"},
        {name: "bike", on_sale: false, price: 500, image: "https://www.backmarket.es/cdn-cgi/image/format%3Dauto%2Cquality%3D75%2Cwidth%3D260/https://d1eh9yux7w8iql.cloudfront.net/product_images/290060_374aef9d-24fa-4d24-bb8c-f27ce27b711f.jpg", tags: "mobile"},
        {name: "tablet", on_sale: true, price: 450, image: "https://www.backmarket.es/cdn-cgi/image/format%3Dauto%2Cquality%3D75%2Cwidth%3D260/https://d1eh9yux7w8iql.cloudfront.net/product_images/290060_374aef9d-24fa-4d24-bb8c-f27ce27b711f.jpg", tags: "mobile"},
        {name: "coche", on_sale: true, price: 700, image: "https://www.backmarket.es/cdn-cgi/image/format%3Dauto%2Cquality%3D75%2Cwidth%3D260/https://d1eh9yux7w8iql.cloudfront.net/product_images/290060_374aef9d-24fa-4d24-bb8c-f27ce27b711f.jpg", tags: "mobile"}
    ]);
    console.log(`Se han creado ${defaultAds.length} anuncios.`)
}

async function initAgentes(){
    // Borrar todos los documentos de la colección de agentes
    const result =  await Agente.deleteMany();
    console.log(`Se han eliminado ${result.deletedCount} agentes.`);
    
    // Crear agentes iniciales

    const inserted = await Agente.insertMany([
        {name: "Smith", age: 30},
        {name: "Jones", age: 35},
        {name: "Brown", age: 19},
        {name: "Xena", age: 20}
    ]);
    console.log(`Se han creado ${inserted.length} agentes.`)
}

function pregunta(texto){
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