const {request,response} = require("express");
const jwt = require("jsonwebtoken");

const validarJWT = (req = request,res = response,next) =>{
    //Leer token
    const token = req.header("x-token");
    //console.log(token);
    if(!token){
        return res.status(401).
        json({
            ok:false,
            msg:"No hay token en la petición"
        })
    }

    try {
        const { uid } = jwt.verify(token,process.env.JWT_SECRET);
        next();

    } catch (error) {
        return res.status(401).
        json({
            ok:false,
            msg:"Token no valido"
        })
    }

    
}

module.exports = {
    validarJWT
}