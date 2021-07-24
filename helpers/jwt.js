const jwt = require("jsonwebtoken");

const generarJWT = (uid) => {
    return new Promise((resolve, reject) => {
        const payload = {
            uid,
        }
        jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: '8h'
        }, (error, token) => {
            if (error) {
                console.log(error);
                reject("No se pudo generar el JTW");
            }else{
                resolve(token);
            }
        })
    })

};

module.exports = {
    generarJWT
};