/*

mejoras: mantener el codigo y lo demas en ingles
❗❗css de las cards que se desfazan
❗❗cambiar mensaje de name es string en el form
❗❗verificar search bar que haga bien el paginado 
❗❗
 ❗❗creo carpetas:
 📙ACTIONS: indexActions.js y action-types.js

 📗COMPONENTS: los diferentes comps, HOME, LANDING, DETAIL, FORM, DOGCREATE, NAVBAR, PAGINATED, SEARCHBAR,DOGS,CARDDOG ETC

 📘IMAGES: solo para ir guardando las imagenes para usar en la pagina(fondos etc)

 📙REDUCER: indexReducer.js, por el momento solo hago una fn para poder exportarlo ya que lo utiliza el inexStore, aca iria toda la papa en validaciones de las actions y el initialState

 📙STORE: indexStore.js: hago el composeEnhacer para que nuestra app se conecte al navegador y hacer las peticiones API/SERVER.
 Este es el objeto central que almacena el >>estado GLOBAL<< de mi aplicacion, es decir no almacena datos(como una DB) mas bien almacena ESTADOS para gestionar los datos en ejecucion en un momento dado. Puedo acceder aca desde cualquier componente de mi app que este envuelto en el <Provider> (por eso envuelvo en mi componente index(o main.jsx), que es el inicio de todo)

 📘STYLES: styles.css. todos los archivos referidos al style de cada componente etc.

 ❗❗en src/index importo el browserRouter de r-r-d
y Provider de r-r; y store de store/indexStore(haber hecho previamente esto)

 ❗❗reemplace por: 
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

 ❗❗alhacer browseRouter en <App />, ahora esta tiene la capacidad de DEFINIR RUTAS. las caracteristicas del enrutador son accesibles desde cualquier parte de la aplicacion.
El PROVIDER permite que el store este disponible para cualqueir COMPONENTE ANIDADO

📙En APP deberia ir colocando las diferentes rutas y el archivo que maneja esas funcionalidades. seria algoasi como cuando hice las rutas del back, que buscaba su endpoint en el handler y ctrl.
importo Routes y route para definir las rutas a los componentes necesarios(tambien los importo), y en el renderizado(return) defino la ruta para cada componente.
tambien necesitare importar useLocation de r-r-d para utilizar mi navBar.

 📗CREO MI COMPONENTE LANDING:En el landing  traigo react y link para hacer mi landingpage. agrego un par de botones para ir a algunos sitios como el home propiamente dicho, acerca de mi, crear usuario o loggearme(no lo pide el readme por lo que tener en cuenta para hacer los componentes correspondientes y su back si es necesario
  
  Es una ventana introductoria. luego se la paso a app para que la renderice al levantar mi app sera lo primero en verse.


 📙Creo mis action types (en mayusculas) para luego hacer los dispatch. exporto una constante del nombre referido a la accion, como traer perros, filtrar por temperamento etc. y son = a una string del mismo nombre(eje: export const POST_DOG = "POST_DOG")
 
INDEXACTIONS❗ :: hago la "logica" de esas actionsTypes.  importo axios para trabajar con url, e importo las action types 
🏁❗🏁❗🏁❗🏁❗🏁❗🏁❗🏁❗
 !!!!ES LA "RELACION" FRONT-BACK!!!!
🏁❗🏁❗🏁❗🏁❗🏁❗🏁❗
 Despacho las acciones que luego manejara el back. algunas serian equivalentes a los controladores, otras seran mas "logica por si mismas" como los filtros y ordenamientos

  📙STORE: indexStore.js: hago el composeEnhacer para que nuestra app se conecte al navegador y hacer las peticiones API/SERVER.
 Este es EL OBJETO CENTRAL que almacena el >>estado GLOBAL<< de mi aplicacion, es decir no almacena datos(como una DB) mas bien almacena ESTADOS para gestionar los datos en ejecucion en un momento dado. Puedo acceder aca desde cualquier componente de mi app que este envuelto en el <Provider> (por eso envuelvo en mi componente index(o main.jsx), que es el inicio de todo)

 📙INDEX_REDUCER: El reducer es una función que RECIBE EL ESTADO actual y una acción, y devuelve un NUEVO ESTADO
 . 
 una vez hecha las actions, deberia ir a mi indexReducer para empezar a traer las acciones allí... largaso.

 defino una const initialState, y alli agrego objetos para ir llenando segun el estado.
 ROOTREDUCER implementa el reducer. mediante switch manejo las diferentes acciones ya catualizacioens del state

 📗Voy haciendo mis componentes auxiliares:
 tengo que tener las imagenes a usar, los styles pueden esperar al ultimo si quiero o ir a la par pero en este punto aun no tengo completo el renderizado de home y rutas, por lo que no podria ir viendo las modificaciones y como se irian viendo.

 📗ERROR: para cuando no encuentro juegos, mostrar mensaje + imagen :)
 📗LOAD: gif de muestra mientras se cargan los perros
 📗PAGINADO: Como se van a organizar las cartas de los pichichos en la pagina, cuantas y cambios a pagina siguiente. esta fn si bien es independiente y no necesita de las otras(no importo nada mas que react, luego exporto) indirectamente si esta relacionada a la limitacion que hago en el componente home para elegir cuantas cards se muestran por pagina
 📗FUNCIONES:Le doy funcionalidad a las opciones de filtrado para que hagan dispatch de sus acciones correspondientes. Creo los manejadores(handler) para filtrado(temperamento), clasificacion(orden alfabetico, y por peso) y fuente(fuente).
 requiere IMPORTAR la accion correspondiente(getByTemperament)

 📗componente SEARCHBAR: hago la funcionalidad de la barra de busqueda, para buscar pichis por nombre.tendra un stado inicial vacio(nada en busqueda), su manejador de cambios, para que al introducir texto en la barra de bsuqueda actualice el estado, y un "reseteo" para que vuelva al estado inicial luego de despachar la accion de busqueda. requiere importar la accion correspondiente(getDogsByName)

 📗componente NAVBAR:importo Link para poder enlazar a otros sitios.
 me importo la searchBar
 me importo la accion de traer todos los perros.

  // creo dos constantes una para /home y otra para cualquier otra ruta, con las que voy a comparar en que ruta estoy para que la search solo se muestre en mi home 

 📗componente CARDDOG: representación visual de un perro en forma de tarjeta. Lo que voy a visualizar en cada "carta" al cargarse el listado de 8 pichis. no requiere ninguna importacion de otro componente/funcionalidad mas que los propios de react(React; y NavLink, para ver una vista full de un determinado perro) mas el componente de style.
 renderizo las cartas tomando las propiedades propias de ellas(this.props) + un style(qe lo defini en ese componente)
 LO USARA EL COMPONENTE DOGS

 📗componente DOGS: acá represento una lista de perros utilizando el componente CardDog, y pasandole props extra como su key,id, etc.
 Si no hay perros disponibles (currentDogs es nulo o vacío), entocnes renderizo mi componente aux de Error.

 (En resumen, el componente Dogs muestra una lista de perros utilizando el componente CardDog. Antes de mostrar la lista, se carga la información de los perros mediante una acción de Redux. Si la carga está en progreso, se muestra un indicador de carga. Si hay perros disponibles, se muestra cada perro en una tarjeta utilizando el componente CardDog. Si no hay perros disponibles, se muestra el componente Error.)

 📗📙componente HOME: necesito importarme las ACCIONES(getAll, ambos filterBy y orderBy)
 el comp aux FUNCIONES
 el comp aux PAGINADO
 el comp NAVBAR(que a su vez usara el searchbar)
 el comp DOGS(que a su vez usara el cardogs)

 📗
 📘
 📙
 ❗❗
ACCIONES PARA EL HOME!:
accion para traer todos los Dogs(getAllVideoDogs)
accion para filtrar por temperamento(filterByTemperamento)
accion para filtrar por fuente(api/bd)(filterBySource)
accion para ordenar(alfabeto y PESO)(orderBy)
accion para ordenar por temperamento(getByGenres)

Componente DogDetail:
para cargar la info de un perro especifico a traves del boton ver mas en este caso, seria como una busqueda por id del back

Componente FORM:

handlerChange: para ir modificando el estado a medida que voy llenando campos.
si le doy un consoleLog(event.target.name)
y consoleLog(event.target.value) iria imprimiendo en la consola cada escritura nueva a medida que sucede.
 setForm({
      ...form,
      [event.target.name]: event.target.value,
    })>>>> aqui creo una copia del estado, y en la 'posicion' .name le paso el valor .value
    si no hiciera la copia del estado(...form) entocnes al llenar un campo este pisaria ese estado, y se perderian todos los demas campos ademas.

OnChange es la que se encarga de ejecutar y pasar el parametro(event) por eso no hace falta ejecutar el handler de las llaves.

los input tienen su propiedad 'name' para que sepan a donde se tiene que guardar los datos que voy llenando(el mismo que estoy queriendo llenar basicamente)

deactivateFormButton:: para activar el boton enviar si no hay errores(campos completos y correctos basicamente)
busca algun error en mi estado errores. si errors tiene algo vacio entocnes paso mi aux a false para que desactive el boton




CORRECIONES CONTRASTAR CLARIDAD EN NAV BAR Y CARDS //✅

LIMITAR PAGINAS EN PAGINADO Y CORREGIR MARGENES//✅

VALIDACION BACK NO VA!//✅

MODULARIZAR MEJOR,//✅⚠️
CONTROLLERS MODULARIZAR//✅
 QUITAR COMENTARIOS,//✅

  CORREGIR TEMPERAMENTO QUE NO MUESTRA DE LA DB✅
  AL CREAR PERRO AGREGAR LOS TEMPERAMENTOS YA SLECCIONADOS A UN LISTADO
MEJORAR MI CODIGO




*/

/*





*/
