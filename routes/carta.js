const {Router} = require("express");

const {
    createCarta,
    updateCarta,
    deleteCarta,
    getCartas
} = require("../controllers/carta");

const router = Router();

router.post("/crca",createCarta);

router.get("/gtca",getCartas);

router.put("/puca",updateCarta);

router.delete("/deca",deleteCarta);


module.exports = router;