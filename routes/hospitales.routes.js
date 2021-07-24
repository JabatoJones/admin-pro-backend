/*
    Ruta: /api/hospitales
*/
const { Router } = require("express");
const { check } = require("express-validator");
const { getHospitales, crearHospital, actualizarHospital, eliminarHospital } = require("../controllers/hospitales.controller");
const { validarCampos } = require("../middelwares/validar-campos");
const { validarJWT } = require("../middelwares/validar.jwt");

const router = Router();


router.get("/", getHospitales);

router.post("/",
    [
        validarJWT,
        check("nombre", "El nombre del hospital es necesario").notEmpty(),
        validarCampos
    ],
    crearHospital
);

router.put("/:id",
    [


    ],
    actualizarHospital
);
router.delete("/:id",
    eliminarHospital
);


module.exports = router;