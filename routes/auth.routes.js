/*
    Ruta: /api/login
*/
const { Router } = require("express");
const { check } = require("express-validator");
const { login } = require("../controllers/auth.controller");
const {validarCampos} = require("../middelwares/validar-campos");

const router = Router();

router.post("/",
    [
        check("email","El email es obligatorio").isEmail(),
        check("password", "La contraseña es obligatoria").notEmpty(),
        validarCampos
    ],
    login
)

module.exports = router;