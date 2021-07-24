const { response } = require("express");
const bcrypt = require("bcryptjs");

const Usuario = require("../models/usuario.model");
const {generarJWT } = require("../helpers/jwt");

const getUsuarios = async (req, res) => {

    //Recupera solo la información nombre email role google de la BBDD
    const usuarios = await Usuario.find({}, "nombre email role google")

    res.json({
        status: res.statusCode,
        ok: true,
        usuarios: usuarios
    })
}

const crearUsuario = async (req, res) => {

    const { email, password } = req.body;

    try {

        const existeEmail = await Usuario.findOne({ email });

        if (existeEmail) {
            return res.status(400)
                .json({
                    status: res.statusCode,
                    ok: false,
                    msg: "El correo ya esta registrado"
                });
        } else {
            const usuario = new Usuario(req.body);            
            //Encriptar contraseña
            const salt = bcrypt.genSaltSync();
            usuario.password = bcrypt.hashSync(password, salt);

            const token = await generarJWT(usuario.id);
            usuario.jwt = token;

            //Guardar usuario
            await usuario.save();
           

            res.json({
                status: res.statusCode,
                ok: true,
                usuario: usuario,
                token
            });
        }


    } catch (error) {
        console.log(error);
        res.status(500)
            .json({
                status: res.statusCode,
                ok: false,
                msg: `Error inesperado... revisar log ${error}`
            });
    }
}

const modificarUsuario = async (req, res = response) => {

    const uid = req.params.id;

    try {
        const usuarioDB = await Usuario.findById(uid);
        if (!usuarioDB) {
            res.status(404)
                .json({
                    ok: false,
                    msg: `No se ha encontrado el usuario por ese id`
                })
        } else {
            //TODO Validar Token y validar su el usuario es correcto

            //ACTUALIZACION
            //Elimino del objeto campos el password,google,email
            const {password,google,email, ...campos} = req.body;

            if (usuarioDB.email !== email) {
                const existeEmail = await Usuario.findOne({ email: email });
                if (existeEmail) {
                    res.status(400)
                        .json({
                            ok: false,
                            msg: `Ya existe un usuario con ese email`
                        })
                }
            }
            campos.email = email;
            // delete campos.password;
            // delete campos.google;

            const usuarioActualizado = await Usuario.findByIdAndUpdate(uid, campos, { new: true })

            res.json({
                ok: true,
                usuario: usuarioActualizado
            })
        }


    } catch (error) {
        console.log(error);
        res.status(500)
            .json({
                ok: false,
                msg: `Error : ${error}`
            })
    }
}

const borrarUsuario = async (req, res = response) => {

    const uid = req.params.id;

    try {
        const usuarioDB = await Usuario.findById(uid);
        if (!usuarioDB) {
            res.status(404)
                .json({
                    ok: false,
                    msg: `No se ha encontrado el usuario por ese id`
                })
        } else {
            await Usuario.findByIdAndDelete(uid)

            res.json({
                ok: true,
                msg: "Usuario eliminado"
            })
        }


    } catch (error) {
        console.log(error);
        res.status(500)
            .json({
                ok: false,
                msg: `Error : ${error}`
            })
    }
}

module.exports = {
    getUsuarios,
    crearUsuario,
    modificarUsuario,
    borrarUsuario
}