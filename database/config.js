const mongoose = require('mongoose');

const dbConnection = async () => {

    try {
        mongoose.connect(process.env.DB_CNN,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useCreateIndex: true
            });
        console.log("Conexion a la BD Inicializada")
    } catch (error) {
        throw new Error(`Error a la hora de conectar a la base de datos, ver logs: 
            ${error}`);

    }


}

module.exports = {
    dbConnection
}
