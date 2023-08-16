const Folder = require("../models/folder");
const createFolder=async(req,res)=>{
    const { user, name } = req.body;

    try {
        const folder = new Folder({ user_id:user._id, name });
        await folder.save();

        res.status(201).json({ message: 'Carpeta creada exitosamente', folder });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al crear la carpeta' });
    }
}
const getFolders=(req,res)=>{
    res.json({msg:"get"})
}
const updateFolder=(req,res)=>{
    res.json({msg:"update"})
}
const deleteFolder=(req,res)=>{
    res.json({msg:"delete"})
}


module.exports={
    createFolder,
    getFolders,
    updateFolder,
    deleteFolder
}