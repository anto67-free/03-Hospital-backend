const { response } = require('express');

const Usuario = require('../models/usuario');
const Medico = require('../models/medico');
const Hospital = require('../models/hospital');


// busqueda de varias collecciones o tablas de un campo determinado por la variable busqueda
const getTodo = async(req, res = response ) => {

    const busqueda = req.params.busqueda;
    const regex = new RegExp( busqueda, 'i');  // condicion insensible ojo

    const [ usuarios, medicos, hospitales ] = await Promise.all([
        Usuario.find({ nombre: regex }),
        Medico.find({ nombre: regex }),
        Hospital.find({ nombre: regex }),
    ]);

    res.json({
        ok: true,
        usuarios,
        medicos,
        hospitales
    })
}


// Busqueda especifica por una coleccion
const getDocumentosColeccion = async(req, res = response ) => {

    const tabla    = req.params.tabla;
    const busqueda = req.params.busqueda;
    const regex    = new RegExp( busqueda, 'i');  // condicion insensible ojo

    let data = [];

    switch ( tabla ) {
        case 'medicos':
            console.log('entro a medicos');
            data = await Medico.find({ nombre: regex })
                                .populate('usuario', 'nombre img')
                                .populate('hospital', 'nombre img');
        break;

        case 'hospitales':
            console.log('entro a hospitales');
            data = await Hospital.find({ nombre: regex })
                                .populate('usuario', 'nombre img');  
        break;

        case 'usuarios':
            console.log('entro a usuarios');
            data = await Usuario.find({ nombre: regex });
        break;
            
        default:
            return res.status(400).json({
                ok: false,
                msg: 'La tabla tiene que ser usuarios/medicos/hospitales'
            });

    }

    res.json({
        ok: true,
        resultados: data
    })
}

module.exports = {
    getTodo,
    getDocumentosColeccion
}