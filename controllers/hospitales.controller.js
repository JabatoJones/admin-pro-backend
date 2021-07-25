const { response } = require("express");
const Hospital = require("../models/hospital.model");

const getHospitales = async (req, res) => {

    const hospitales = await Hospital.find().
    populate("usuario","nombre img")


    res.json({
        ok: true,
        msg: hospitales
    })
}

const crearHospital = async (req, res) => {

    const uidUsuarioCreador = req.uid;
    const hospital = new Hospital(
        {
            usuario: uidUsuarioCreador,
            ...req.body
        });


    try {
        const hospitalDB = await hospital.save();

        res.json({
            ok: true,
            hospital: hospitalDB
        })

    } catch (error) {
        res.status(500).
            json({
                ok: false,
                msg: "Se ha producido un error,contacte con el administrador"
            })
    }
}

const actualizarHospital = (req, res) => {
    res.json({
        ok: true,
        msg: "actualizarHospital"
    })
}

const eliminarHospital = (req, res) => {
    res.json({
        ok: true,
        msg: "eliminarHospital"
    })
}

module.exports = {

    getHospitales,
    crearHospital,
    actualizarHospital,
    eliminarHospital
}