const mongoose = require('mongoose');


const dbConnection = async () => {
    
    try {
        await mongoose.connect(process.env.DB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });

        console.log('DB Online');
        
    } catch (error) {
        console.log(error);
        throw new Error('Error a la hora de iniciar la BD ver logs');        
    } 

}

// exportamos dbconnection
module.exports = {
    dbConnection
}

// mongodb+srv://mean_user:GQQJ4SLnyWLmCCRx@cluster0.gn4ih.mongodb.net/hospitaldb?authSource=admin&replicaSet=atlas-b01iv1-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true
// usuario: mean_user
// password: GQQJ4SLnyWLmCCRx