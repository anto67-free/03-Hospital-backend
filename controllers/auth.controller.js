// response para tener las ayudas en vscode
const { response } = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/jwt');
const { googleVerify } = require('../helpers/google-verify');

const login = async( req, res = response ) =>{

    const { email, password } = req.body;

    try {

        // Verificando email
        const usuarioDB = await Usuario.findOne({ email });
        
        if ( !usuarioDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'Dato incorrecto. !!'
            });
        }

        // Verificando contraseña
        const validPassword = bcrypt.compareSync( password, usuarioDB.password );

        if ( !validPassword ) {
            return res.status(400).json({
                ok: false,
                msg: 'Dato incorrecto. !!!'
            });
        }

        // Generar el TOKEN - JWT
        const token = await generarJWT( usuarioDB.id );


        res.json({
            ok: true,
            token
        })


    } catch (error) {
       console.log(error);
       res.status(500).json({
           ok: false,
           msg: 'Hable con el administrador'
       }) 
    }
}

const googleSignIn = async(req, res = response) => {

    const googleToken = req.body.token;

    try {

        const { name, email, picture } = await googleVerify( googleToken );

        const usuarioDB = await Usuario.findOne({ email });
        let usuario;

        if ( !usuarioDB ) {
            // SI NO EXISTE EL USUARIO -------------------
            usuario = new Usuario({
                nombre: name,
                email,
                password: '@@@',
                img: picture,
                google: true
            });
        } else {
            // EXISTE USUARIO -------------------------------
            usuario = usuarioDB;
            usuario.google = true;
            // usuario.password = '@@@';
        }
        
        // GUARDAR EN BBDD ---------------------------------
        await usuario.save();


        // Generar el TOKEN - JWT --------------------------
        const token = await generarJWT( usuario.id );



        res.json({
            ok: true,
            msg: 'Google Sign In',
            token
        });
        
    } catch (error) {

        res.status(401).json({
            ok: false,
            msg: 'Token no es correcto',
        });
    }

}

const renewToken = async( req, res = response ) => {

    const uid = req.uid;

    // Generar el TOKEN - JWT --------------------------
    const token = await generarJWT( uid );

    res.json({
        ok: true,
        uid
    })
}


module.exports = {
    login,
    googleSignIn,
    renewToken
}