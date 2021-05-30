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

// Base de Datos
dbConnection();

// console.log(process.env);


// mongodb
// usuario: mean_user
// password: GQQJ4SLnyWLmCCRx
// mongoose.js.com :   https://mongoosejs.com/

// Rutas
app.get( '/', (req, res) => {

    res.json({
        ok: true,
        msg: 'Hola Mundo'
    })
});



// Levantar el servidor en puerto correspondiente
app.listen( process.env.PORT, () => {
    console.log('Servidor corriendo en puerto ' + process.env.PORT );
});