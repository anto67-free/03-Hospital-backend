// guarda las variables de entorno en el arch.de node config
require('dotenv').config();

// Cargamos express para crear nuestro servidor
const express = require('express');

// importando cors
const cors = require('cors');

// Coneccion a la BBDD
const { dbConnection } = require('./database/config');

// Crear el servidor express
const app = express();

// Configurar cors, es un middleware y seva a ejecutar todas las lineas que siguen hacia abajo
app.use(cors());

// Lectura y parseo del Body
app.use( express.json() );

// Base de Datos
dbConnection();

// console.log(process.env);


// mongodb
// usuario: mean_user
// password: GQQJ4SLnyWLmCCRx
// mongoose.js.com :   https://mongoosejs.com/

// Direcotrio publico
app.use( express.static ('public') );


// Rutas
app.use( '/api/usuarios', require('./routes/usuarios-routes') );
app.use( '/api/hospitales', require('./routes/hospitales') );
app.use( '/api/medicos', require('./routes/medicos') );
app.use( '/api/todo', require('./routes/busquedas') );
app.use( '/api/upload', require('./routes/uploads') );
app.use( '/api/login', require('./routes/auth-routes') );





// Levantar el servidor en puerto correspondiente
app.listen( process.env.PORT, () => {
    console.log('Servidor corriendo en puerto ' + process.env.PORT );
});

// ejecutar el servidor
// npm run start:dev

// repositrio de github
// git add .
// git commit -m "Sin seecion 11"
// git push     (para subirlo a github)
// git tag      (para ver la versiones en este caso va v0.10.0)
// git tag -a v0.11.0 -m "fin seccion 11 - CRUD y file Upload"    (para agregar la version)
// git push --tags        (para subir los tags)
// git remote -v          (para ver los urls, a continuacion mostrara)
// origin  https://github.com/anto67-free/03-Hospital-backend.git (fetch)
// origin  https://github.com/anto67-free/03-Hospital-backend.git (push)