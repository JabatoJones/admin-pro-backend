const { response } = require("express");


const getMedicos = (req, res) => {
    res.json({
        ok:true,
        msg:"getMedicos"
    })
}

const crearMedico = (req, res) => {
    res.json({
        ok:true,
        msg:"crearMedico"
    })
}

const actualizarMedico = (req, res) => {
    res.json({
        ok:true,
        msg:"actualizarMedico"
    })
}

const eliminarMedico = (req, res) => {
    res.json({
        ok:true,
        msg:"eliminarMedico"
    })
}

module.exports = {

    getMedicos,
    crearMedico,
    actualizarMedico,
    eliminarMedico
}