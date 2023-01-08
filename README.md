# Nodepop
**NodePop** es una API para la gestión de anuncios de compra/venta de artículos desarrollada en Node.js. Además de mostrar los artículos disponibles, permite filtrar por varios criterios de búsqueda y paginar los resultados obtenidos.

## Dónde visualizarla

La API está disponible en 
http://127.0.0.1:3000

## Tecnologías utilizadas

   1. MongoDB
   2. Node.js
   3. Mongoose 
   4. Express


#### Instalar Mongoose
```npm install mongoose```

#### Instalar dependencias del proyecto
```npm install```

#### Iniciar API
```npm run dev```

#### Inicializar la Base de Datos
```node init-db.js```

#### Para obtener lista de Anuncios:
```http://localhost:3000/apiv1/anuncios```

#### Para obtener lista de tags:
```http://localhost:3000/apiv1/anuncios/tags```

### Filtros

#### Filtrar por tag

CASO1: Artículos en Venta
```http://localhost:3000/apiv1/anuncios?sale=true```

CASO2: Artículos que la gente demanda
```http://localhost:3000/apiv1/anuncios?sale=false```

#### Filtrar por nombre
```http://localhost:3000/apiv1/anuncios?name=b```

#### Filtrar por rango de precios
```http://localhost:3000/apiv1/anuncios?min=0&&max=301```

### Filtrar por precio mínimo
```http://localhost:3000/apiv1/anuncios?min=100```

### Filtrar por precio máximo
```http://localhost:3000/apiv1/anuncios?max=700```

## Ruta para las imágenes
```http://127.0.0.1:3000/images/iphone-11.jpg```