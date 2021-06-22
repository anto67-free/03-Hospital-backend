// next() es la funcion que tengo que llamar si todo sale bien

const  jwt = require('jsonwebtoken');

const validarJWT = (req, res, next) => {

    // Leer el Token
    const token = req.header('x-token');

    if ( !token ) {
        return res.status(401).json({
            ok: false,
            msg: 'No hay token en la petición'
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

// respaldo
// git add 
// git commit -m "Fin sección 10 - Auth"
// git push
// git tag     revisa mis tags
// git tag -a v0.10.0 -m "Fin seccion 10 - auth"     coloco mi nueva version
// git push --tags      y con esto lo subo a github
// git remote -v        Esto es para ver los urls
//  https://github.com/anto67-free/03-Hospital-backend.git