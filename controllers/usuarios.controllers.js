const { response } = require('express');
const bcrypt = require('bcryptjs');

const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/jwt');


const getUsuarios = async(req, res) => {
    // paginacion capitulo 128
    const desde = Number(req.query.desde) || 0;
    console.log(desde);

    // const usuarios = await Usuario
    //                         .find({}, 'nombre apellido google email role')
    //                         .skip( desde )
    //                         .limit( 5 );

    // const total = await Usuario.countDocuments();

    const [ usuarios, total ] = await Promise.all([
        Usuario
            .find({}, 'nombre email role google img')
            .skip( desde )
            .limit( 5 ),

        Usuario.countDocuments()    
    ]);


    res.json({
        ok: true,
        usuarios,
        total
        // uid: req.uid
    });
}

const crearUsuario = async(req, res = response) => {

    const { email, password, nombre } = req.body;

    try {

        const existeEmail = await Usuario.findOne({ email });

        if ( existeEmail ) {
            return res.status(400).json({
                ok: false,
                msg: 'El correo ingresado esta registrado'
            });
        }

        const usuario = new Usuario( req.body );

        // Encriptar contraseña ---------------------------------------
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync( password, salt );

        // Guardar Usuario (con esto lo graba en la BBDD)-------------
        await usuario.save(); 

        // Generar el TOKEN - JWT
        const token = await generarJWT( usuario.id );


        res.json({
            ok: true,
            usuario,
            token
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... revisar logs'
        })
    }


}

const actualizarUsuario = async (req, res = response) => {

    // validar token y comprobar si es el usuario correcto

    const uid = req.params.id;


    try {

        const usuarioDB = await Usuario.findById( uid );

        if ( !usuarioDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un usuario por ese id'
            });
        }

        // Actualizaciones
        const { password, google, email, ...campos } = req.body;

        if ( usuarioDB.email !== email ) {

            const existeEmail = await Usuario.findOne({ email });
            if ( existeEmail ) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe un usuario con ese email'
                });
            }
        }
        
        campos.email = email;
        const usuarioActualizado = await Usuario.findByIdAndUpdate( uid, campos, { new: true } );

        res.json({
            ok: true,
            usuario: usuarioActualizado
        });

        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        })
    }

}

// Metodo BORRAR USUARIO ---------------------------------------------
const borrarUsuario = async(req, res = response) => {

    const uid = req.params.id;
    
    try {

        const usuarioDB = await Usuario.findById( uid );

        if ( !usuarioDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un usuario por ese id'
            });
        }

        // con esto borramos al usuario del BBDD
        await Usuario.findByIdAndDelete( uid );

        res.json({
            ok: true,
            msg: 'Usuario eliminado', uid
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}
// ---------------------------------------------------------------------


module.exports = {
    getUsuarios,
    crearUsuario,
    actualizarUsuario,
    borrarUsuario
}

// instalaremos express-validator para realizar validaciones mas rapidas con menos codigo
// npm i express-validator

// instalaremos libreria que nos ayudara a encriptar las contraseñas
// npm i bcryptjs
