const {Router} = require("express");

const {
    createFolder,
    getFolders,
    updateFolder,
    deleteFolder
} = require("../controllers/folder");

const {validarResultados} = require("../helpers/validarResultados")
const {validarJwt} = require("../helpers/jsonwebtoken");
const { check } = require("express-validator");

const {existeFolderPorId} = require("../helpers/db-validator")
const router = Router();

router.post("/crfo",[
    check("name","EL nombre es obligatorioi").not().isEmpty(),
    validarJwt,
    validarResultados
],createFolder);

router.get("/gtfo",
[   

    validarJwt,
    validarResultados
]
,getFolders);

router.put("/pufo/:id",
[
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeFolderPorId ),
    check("name","el nombre es obligatorio").not().isEmpty(),
    validarJwt,
    validarResultados
],updateFolder);

router.delete("/defo/:id",[
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeFolderPorId ),
    validarJwt,
    validarResultados
],deleteFolder);


module.exports = router;