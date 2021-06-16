// ahora crearemos el JWT token
// pagina para informarse www.jwt.io 
// instalaremos un paquete en la consola:
// npm i jsonwebtoken       para crear JWT usamos el sign

const jwt = require('jsonwebtoken');


const generarJWT = ( uid ) => {

    return new Promise( ( resolve, reject ) => {

        const payload = {
            uid,
        }
    
        jwt.sign( payload, process.env.JWT_SECRET, {
            expiresIn: '24h'
        }, ( err, token ) => {
    
            if ( err ) {
                console.log(err);
                reject('No se pudo generar el JWT');
            } else {
                resolve( token );
            }
        });

    });

}

module.exports = {
    generarJWT,
}