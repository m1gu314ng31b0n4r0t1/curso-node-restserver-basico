const mongoose = require('mongoose');

//Para hacer la coneccion a la base de datos es necesario importar la libreria de mongoose
const dbConnection = async() =>{
    try {
        //Oucpar el API de mongoose con la url de la bd configurada en las variables de entorno
        //mongodb+srv://admin:ZY8CosbAsNjxDUnd@miclustecommerce.jw4mbnb.mongodb.net/commercedb
        //Ponemos el await para esperar la respuesta de la promesa connect
        await mongoose.connect( process.env.MONGODB_CNN, /*{
            //Configuracion para incializar la base de dadots REVISAR POR QUE YA ESTA DEPRECADO ESTAS OPCIONES  options usecreateindex, usefindandmodify are not supported
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        } */);

        console.log('Base de datos conectada exitosamente');
        
    } catch (error) {
        console.log(error);
        throw new Error('Error al incializar en la base de datos');
    }
}

module.exports ={
    dbConnection
}

    