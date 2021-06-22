const { Schema, model } = require('mongoose');


const HospitalSchema = Schema({

    nombre: {
        type: String,
        required: true
    },
    img: {
        type: String,
    },
    usuario: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    }
}, { collection: 'hospitales' });   // esto es para que no aparezca en mongodb la collecion 
// como hospitals


// Esto para fines visuales no afecta la BBDD
HospitalSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject();
    return object;
})

module.exports = model( 'Hospital', HospitalSchema );


// En usuario le indica a Mongoose que va haber una relacion con el documento
// o tabla USUARIO