/*
PASITOS:
index.js : seria MI RAIZ, donde inicia la conexion del BACK, es listen del server. tambien modifico en app el mainrouter.

creo los 2 modelos que me piden para luego conectarlos en la db

creo la base de datos con sql: CREATE DATABASE drivers;

hago la relacion(lo unico que tengo que hacer aca) en el archivo db.js para conectar entre si y hacer la tabla intermedia:
const { Driver, Teams } = sequelize.models

Driver.belongsToMany(Teams, { through: "Driver_Team" });
Teams.belongsToMany(Driver, { through: "Driver_Team" });

creo las rutas: driversRoutes y teamsRoutes aca va a ir toda la mdularizacion de las rutas, para requerirlas en el index de routes y tener ahi solo dos rutas. mientras tanto requiero el Router, y creo una constante del mismo nombre del archivo = Router(). y exporto para que no rompa poder usarlo mientras en el index de routes, que a su vez lo usara el archivo app(o server segun se llame)

creo las carpetas de: 
MIDDLEWARES: para hacer validacion al crear un nuevo driver
HANDLERS: handler para drivers y handler para teams
CONTROLLERS: ctrl para drivers y ctrl para teams...

luego de realizado el primer paso de las rutas, creo mi /controllers/y cada controlador de forma independiente segun la accion a realizar
lo mismo hago en handlres, uno para cada controller

En el controller, tengo que REQUERIR los modelos de la bd, tambien axios; y OPCIONALMENTE la api key, y Op desde sequelize si hubiese/fuese necesario.

ORDEN DE LECTURA:

 ⚠️INDEX.JS:(junto a app y db):es el listen del server.  sincroniza la BD con el servidor

 ⚠️SERVER.JS:"maneja" las request que vienen desde el cliente(FRONT-END). al llegar las request las tiene que ir a buscar a routes/index

 ⚠️ROUTES/INDEX.JS: diversifico en donde tendra que ir a buscar segun el tipo de peticion que le llega. en este caso son dos rutas: una de DRIVERS(que a su vez contiene "sub" rutas:: /:id y /name ) y otra de TEAMS que solo contiene una ruta general(asi misma). ANTE peticiones a drivers, ira a buscar su ENDPOINT al archivo /driversRoutes; y ANTE peticiones a teams, ira a bsucar su ENDPOINT al archivo /temperamentRoutes

 estos LOS REQUIERO tambien de la misma carpeta rutas.

 ⚠️ROUTES/driversroutes.JS: todo lo que llega a /drivers llega a este archivo a buscar el ENDPOINT(get, post,delete, etc)
Dentro creo cada ruta segun el metodo requerido, y el handler correspondiente con el que trabajará esa ruta(importarlo)

 ⚠️ROUTES/TEAMSroutes.JS:lo mismo pero para teams, en este caso solo tiene una ruta. tambien buscara su handler.

 ⚠️HANDLERS/driversHandler.js _ teamsHandler.js:

 Los handlers son funciones específicas que se utilizan como controladores para un tipo particular de solicitud o evento  y para ejecutar las acciones necesarias en respuesta a ello.
 
 Aca creo lo que será la "respuesta" segun se haya logrado o no lo que se requeria(traer drivers, postear, etc) ya sea con un status 200 o 400.se logra requiriendo el CONTROLLER especifco que se encarga de realizar la logica. habra tantos handlers dentro de este archivo, como acciones especificas diferentes se necesiten.(4 en el handler de drivers por lo tanto 4 controllers, y 1 en el de hanlder de teams).

⚠️CONTROLLERS/
 SON LA LOGICA detras de las peticiones, reciben las solicitudes, procesan los datos, interactuan con la BD etc

 Son las funciones que tienen que buscar, como hacer, donde, con que especificaciones etc. estas funciones son las que van a cada handler, y segun el resutlado es la devolucion de ese handler.
 
 FIN DEL RECORRIDO BACKEND🙃.
 
❗Luego quedan los MODELS: que contienen la info de como se deben estructurar las tablas de la BD y que informacion y tipo contenerán.
 
❗Y la DB propiamente dicha(db.js) que hace la relacion entre los modelos, construye la tabla intermedia y le da informacion a los controladores etc.
 
 ❗En MIDDLEWARES puedo agregar validacioens para evitar que errores lleguen hasta la BD.


  ⚠️Para probar ruta/controlador de createNewDog:

 POST por body a>>> http://localhost:3001/drivers
 ejemplo 1
 {
  "name":"pichicho",
  "teams":["happy", "Independent"],
  "image":"image",
  "weight":"12",
  "height":"10",
  "life_span":"8"
};
 ejemplo 2
{
  "name":"pichichin",
  "teams":["crazy", "Independent"],
  "image":"image",
  "weight":"12",
  "height":"10",
  "life_span":"8"
}

  losmando por separado!

 ⚠️Para probar la ruta/controlador de getDogByName:

 GET a >>>http://localhost:3001/drivers/name?name="nombre del pichicho, sin comilla". Devuelve las coincidencias que encuentre tanto en BD como en API

 ⚠️Para probar ruta/controlador de getDogById:

 GET a>>> http://localhost:3001/drivers/5
❗Si solo uso numero devuelve el pichicho buscando en la API

 http://localhost:3001/drivers/9bef2c0e-be64-4812-ab86-cc71fa37ffd9 (UUID)buscará en mi BD
❗En cambio si uso numero y caracteres buscara en la BD

seria como una doble validacion, en el handler  creo la const source y me pregunto si el source(es decir el id) es NaN(no es numero puro), o si es SOLO NUMERO.. SI NO ES numero le doy el string BD; entonces en el controller hago la otra validacion, creo una constante(dogId) que sera igual a la constante source, entonces si la source le esta pasando el string API le digo que entre a la url de la api, en cambio si le pasa el string BD le digo que busque por primaryKey(findByPk) en mi BD(drivers).NOTA: en el caso del controler solo necesito una validacion en este caso fue ser === "API", el ternario por descarte si no recibe API no busca en la url sino en la BD, podria recibir cualquier otro string pero al provenir de otra funcion ya vienen los 2 string posibles










*/
//ejecuto el comando npm run seed para crear las tablas y insertar registros
// instalo nodemon, mocha, chai, supertest
// creo un servidor express usando body parser, morgan, cors, cookieParser
// creo una ruta get /drivers para mostrar todos los perros guardados en la bd
// creo otra ruta get /drivers/:id para actualizar por id cada uno de los perros almacenado en la bd
// creo otro endpoint get /drivers/name para buscar por name
// creo otro endpoint delete /drivers/:id para borrar por id cada uno del perro almacenado en la bd
// creo test unitarios para verificar si funciona correctamente todo lo anterior

//
//
// "author": "Henry",
//   "license": "ISC",
//   "engines": {
//     "node": ">=12.18.3",
//     "npm": ">=6.14.6"
//   },
//   "dependencies": {
//     "body-parser": "^1.19.0",
//     "cookie-parser": "^1.4.5",
//     "cors": "^2.8.5",
//     "dotenv": "^8.2.0",
//     "express": "^4.17.1",
//     "morgan": "^1.10.0",
//     "pg": "^8.5.1",
//     "sequelize": "^6.3.5"
//   },
//   "devDependencies": {
//     "supertest-session": "^4.1.0",
//     "mocha": "^8.2.1",
//     "chai": "^4.2.0",
//     "nodemon": "^2.0.6",
//     "supertest": "^6.0.1"
//   }
