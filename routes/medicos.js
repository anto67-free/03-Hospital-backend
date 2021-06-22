/*
    Medicos
    ruta: '/api/medico'
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { validarJWT } = require('../middlewares/validar-jwt');

const {
    getMedicos,
    crearMedico,
    actualizarMedico,
    borrarMedico
} = require('../controllers/medicos');


const router = Router();

// leer usuarios
router.get( '/', getMedicos );

router.post( '/',
    [
        validarJWT,
        check('nombre', 'El nombre del medico es necesario !!').not().isEmpty(),
        check('hospital', 'El hospital id debe ser valido !!').isMongoId(),
        validarCampos
    ],
    crearMedico
);

// Actualización de usuario (update)
router.put( '/:id',
    [],
    actualizarMedico
);

// Borrar usuario (delete)
router.delete( '/:id',
    borrarMedico
);


module.exports = router;