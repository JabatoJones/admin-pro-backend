require("dotenv").config();

const express = require("express");
const cors = require('cors');

const { dbConnection } = require ( "./database/config");
const app = express();

//Configurar CORS
app.use(cors())

//Llamada a la base de datos
dbConnection();

// console.log(process.env);

//Rutas
app.get("/",(req,res)=>{
    res.status(400).json({
        ok:true,
        msg:"Hola"
    })
})

app.listen(process.env.PORT, ()=> {
    console.log(`Servidor corriendo en el puerto  ${process.env.PORT} `);
})