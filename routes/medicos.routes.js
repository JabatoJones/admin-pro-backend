/*
    Ruta: /api/medicos
*/
const { Router } = require("express");
const { check } = require("express-validator");
const { getMedicos, crearMedico, actualizarMedico, eliminarMedico } = require("../controllers/medicos.controller");
const { validarCampos } = require("../middelwares/validar-campos");
const { validarJWT } = require("../middelwares/validar.jwt");

const router = Router();


router.get("/", getMedicos);

router.post("/", [
    validarJWT,
    check("nombre", "El nombre del medico es necesario").notEmpty(),
    check("hospital", "El hospitalId debe de ser valido").isMongoId(),
    validarCampos
],
    crearMedico
);

router.put("/:id",
    [


    ],
    actualizarMedico
);
router.delete("/:id",
    eliminarMedico
);


module.exports = router;