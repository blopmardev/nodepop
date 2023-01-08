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
        {name: "iphone", sale: true, price: 300, image: "https://www.backmarket.es/cdn-cgi/image/format%3Dauto%2Cquality%3D75%2Cwidth%3D260/https://d1eh9yux7w8iql.cloudfront.net/product_images/290060_374aef9d-24fa-4d24-bb8c-f27ce27b711f.jpg", tag: "mobile"},
        {name: "bike", sale: false, price: 500, image: "https://contents.mediadecathlon.com/p2281143/k$186136114cbb9fa8ab038346682ed070/sq/bicicleta-urbana-clasica-elops-520-cuadro-bajo-28-pulgadas-6-v-azul.jpg?format=auto&f=800x0", tag: "lifestyle"},
        {name: "taladradora", sale: false, price: 450, image: "https://media.adeo.com/marketplace/LMES/82039766/1891756.png?width=650&height=650&format=jpg&quality=80&fit=bounds", tag: "work"},
        {name: "coche", sale: true, price: 10000, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaA3TermEhBifLWRUy-47yB17siGhWuJ549A&usqp=CAU", tag: "motor"},
        {name: "vestido", sale: true, price: 40, image: "https://img01.ztat.net/article/spp-media-p1/0175aab781344797b74850e440653cb7/b1a27d7130f2404f8518c912c1ed44ff.jpg?imwidth=1800&filter=packshot", tag: "lifestyle"}
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