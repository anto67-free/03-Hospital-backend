const { Schema, model } = require('mongoose');


const MedicoSchema = Schema({

    nombre: {
        type: String,
        required: true
    },
    img: {
        type: String,
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    hospital: {
        type: Schema.Types.ObjectId,
        ref: 'Hospital',
        required: true
    }

}, { collection: 'medicos' });   // esto es para que no aparezca en mongodb la collecion 
// como medicos


// Esto para fines visuales no afecta la BBDD
MedicoSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject();
    return object;
})

module.exports = model( 'Medico', MedicoSchema );


// En usuario le indica a Mongoose que va haber una relacion con el documento
// o tabla USUARIO