/*
    Ruta: /api/usuarios
*/
const { Router } = require("express");
const { check } = require("express-validator");

const { getUsuarios, crearUsuario, modificarUsuario, borrarUsuario } = require("../controllers/usuarios.controler");
const { validarCampos } = require("../middelwares/validar-campos");
const { validarJWT } = require("../middelwares/validar.jwt");

const router = Router();


router.get("/", validarJWT, getUsuarios);

router.post("/",
    [
        check('nombre', 'El nombre es obligatorio').notEmpty(),
        check('password', 'La password es obligatoria').notEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        validarCampos

    ],
    crearUsuario
);

router.put("/:id",
    [
        validarJWT,
        check('nombre', 'El nombre es obligatorio').notEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('role', 'El role es obligatorio').notEmpty(),
        validarCampos

    ],
    modificarUsuario
);
router.delete("/:id",
    validarJWT,
    borrarUsuario
);


module.exports = router;