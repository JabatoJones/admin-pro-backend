const { response } = require("express")
const bcrypt = require("bcryptjs");

const Usuario = require("../models/usuario.model");
const {generarJWT} = require("../helpers/jwt");

const login = async (req, res = response) => {

    const { email, password } = req.body;

    try {

        const usuarioDB = await Usuario.findOne({ email });


        //Verificar Email
        if (!usuarioDB) {
            return res.status(404).
                json({
                    ok: false,
                    msg: "Email/password invalidos"
                })
        }

        //Verificar contraseña
        const validPassword = bcrypt.compareSync(password, usuarioDB.password);
        if (!validPassword) {
            return res.status(404).
                json({
                    ok: false,
                    msg: "Password/Email invalidos"
                })
        }

        //Generar Token
        const token = await generarJWT(usuarioDB.id);

        res.json({
            ok: true,
            msg: token
        })

    } catch (error) {
        res.status(500).
            json({
                ok: false,
                msg: `Se ha producido un error, intentelo pasado unos minutos`
            })
    }
}

module.exports = {
    login
}