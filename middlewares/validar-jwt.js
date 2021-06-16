// next() es la funcion que tengo que llamar si todo sale bien

const  jwt = require('jsonwebtoken');

const validarJWT = (req, res, next) => {

    // Leer el Token
    const token = req.header('x-token');

    if ( !token ) {
        return res.status(401).json({
            ok: false,
            msg: 'No hay token en la peptición'
        });
    }

    try {
        
        const { uid } = jwt.verify( token, process.env.JWT_SECRET );
        req.uid = uid;
        
        next();

    } catch ( error ) {
        return res.status(401).json({
            ok: false,
            msg: 'Token no valido'
        });
    }
    
}

module.exports = {
    validarJWT
}