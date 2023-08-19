const {Router} = require("express");

const {
    createCarta,
    updateCarta,
    deleteCarta,
    getCartaPorId,
    getCartaPorFolder,
    updateInterval
} = require("../controllers/carta");
const { validarJwt } = require("../helpers/jsonwebtoken");
const { validarResultados } = require("../helpers/validarResultados");
const {existeCartaPorId, existeFolderPorId} = require("../helpers/db-validator");
const { check } = require("express-validator");

const router = Router();

router.post("/crca/:folder_id",[
    check('folder_id', 'No es un ID válido').isMongoId(),
    check('folder_id').custom( existeFolderPorId ),
    check("front","Pon la parte de enfrente").not().isEmpty(),
    check("back","pon la parte de atras").not().isEmpty(),
    validarJwt,
    validarResultados
],createCarta);

router.get("/gtca/:id",[
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeCartaPorId ),
    validarJwt,
    validarResultados
],getCartaPorId);

router.get("/gtcafo/:id",[
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeFolderPorId ),
    validarJwt,
    validarResultados
],getCartaPorFolder);

router.put("/puca/:id",[
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeCartaPorId ),
    check("front","Pon la parte de enfrente").not().isEmpty(),
    check("back","pon la parte de atras").not().isEmpty(),
    validarJwt,
    validarResultados
],updateCarta);

router.put("/repaso/:id",[
    check("interval","tienes que actualizar el intervalo").not().isEmpty(),
    validarJwt,
    validarResultados
],updateInterval);

router.delete("/deca/:id",[
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeCartaPorId ),
    validarJwt,
    validarResultados
],deleteCarta);


module.exports = router;