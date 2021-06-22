/*
    Hospitales
    ruta: '/api/hospitales'
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { validarJWT } = require('../middlewares/validar-jwt');

const {
    getHospitales,
    crearHospital,
    actualizarHospital,
    borrarHospital
} = require('../controllers/hospitales');


const router = Router();

// leer usuarios
router.get( '/',
     getHospitales
);

router.post( '/',
    [
        validarJWT,
        check('nombre','El nombre del hospital es necesario !!').not().isEmpty(),
        validarCampos
    ],
    crearHospital
);

// Actualización de usuario (update)
router.put( '/:id',
    [],
    actualizarHospital
);

// Borrar usuario (delete)
router.delete( '/:id',
    borrarHospital
);


module.exports = router;
