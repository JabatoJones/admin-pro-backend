require("dotenv").config();

const express = require("express");
const cors = require('cors');

const { dbConnection } = require ( "./database/config");
const app = express();

//Configurar CORS
app.use(cors());

//Lectura y parseo del body
app.use(express.json());

//Llamada a la base de datos
dbConnection();

// console.log(process.env);

//Rutas
app.use("/api/usuarios",require("./routes/usuarios.routes"));
app.use("/api/login",require("./routes/auth.routes"));
app.use("/api/hospitales",require("./routes/hospitales.routes"))
app.use("/api/medicos",require("./routes/medicos.routes"))


app.listen(process.env.PORT, ()=> {
    console.log(`Servidor corriendo en el puerto  ${process.env.PORT} `);
})

