const {Router} = require("express");

const {
    createFolder,
    getFolders,
    updateFolder,
    deleteFolder
} = require("../controllers/folder");

const router = Router();

router.post("/crfo",createFolder);

router.get("/gtfo",getFolders);

router.put("/pufo",updateFolder);

router.delete("/defo",deleteFolder);


module.exports = router;