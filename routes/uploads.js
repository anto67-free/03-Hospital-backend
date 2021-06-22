/*

    ruta: api/uploads/
*/
const { Router } = require('express');
const expressFileUpload = require('express-fileupload');

const { validarJWT } = require('../middlewares/validar-jwt');

const { fileUpload, retornaImagen } = require('../controllers/uploads');

const router = Router();

router.use(expressFileUpload());


// tipo puede ser : usuarios, medicos, hospitales
// luego el ID del documentos el cual yo quiero actualizar (subiendo imagen)
router.put( '/:tipo/:id', validarJWT, fileUpload );

router.get( '/:tipo/:foto', retornaImagen );




module.exports = router;