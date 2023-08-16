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
const router = Router();

router.post("/crfo",[
    check("name","EL nombre es obligatorioi").not().isEmpty(),
    validarJwt,
    validarResultados
],createFolder);

router.get("/gtfo",getFolders);

router.put("/pufo",updateFolder);

router.delete("/defo",deleteFolder);


module.exports = router;