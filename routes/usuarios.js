const {Router} = require("express");
const {check} = require("express-validator");

const {
    createUser,
    deleteUser,
    updateUser,
    getUsers,
    authUser
} = require("../controllers/usuario");

const {validarResultados} = require("../helpers/validarResultados");
const { validarJwt } = require("../helpers/jsonwebtoken");
const { existeUsuarioPorId } = require("../helpers/db-validator");


const router = Router();


//crear usuaio
router.post("/crus",
[
    check("email","no es un correo valido").isEmail(),
    check("password","introduzca una contraseña de mas de 8 caracteres").notEmpty(),
    validarResultados,
],createUser);



//iniciar sesion
router.post("/auth",
    check("email","el correo no es valido").isEmail(),
    check("password","el password es obligatorio").not().isEmpty(),
    validarResultados
,authUser);


//obtener usuarios
router.get("/gtus",
    validarJwt
,getUsers);


//actualizar usuarios
router.put("/puus/:id",[
    check("email","El correo es obligatorio").isEmail(),
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeUsuarioPorId ),
    validarJwt,
    validarResultados
],updateUser);

//eliminar usuarios
router.delete("/deus/:id",[
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeUsuarioPorId ),
    validarResultados
],deleteUser);

module.exports = router;