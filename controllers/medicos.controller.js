const { response } = require("express");
const Medico = require("../models/medico.model");


const getMedicos = async (req, res) => {
    const medicos = await Medico.find()
        .populate("usuario", "nombre img")
        .populate("hospital", "nombre img")

    res.json({
        ok: true,
        msg: medicos
    })
}

const crearMedico = async (req, res) => {
    const uidUsuarioCreador = req.uid;
    const idHospital = req.body.hospital;

    try {
        const medico = new Medico(
            {
                usuario: uidUsuarioCreador,
                hospital: idHospital,
                ...req.body
            });
        const medicoDB = await medico.save();

        res.json({
            ok: true,
            medico: medicoDB
        })

    } catch (error) {
        res.status(500).
            json({
                ok: false,
                msg: `Se ha producido un error,contacte con el administrador ${error}`
            })
    }
}

const actualizarMedico = (req, res) => {
    res.json({
        ok: true,
        msg: "actualizarMedico"
    })
}

const eliminarMedico = (req, res) => {
    res.json({
        ok: true,
        msg: "eliminarMedico"
    })
}

module.exports = {

    getMedicos,
    crearMedico,
    actualizarMedico,
    eliminarMedico
}