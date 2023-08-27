const Folder = require("../models/folder");
const Carta = require("../models/carta");

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

const getFolders=async(req,res)=>{
    const { user } = req.body;

    try {
        const folders = await Folder.find({ user_id: user._id });
        res.json({ folders });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener las carpetas' });
    }
}

const updateFolder=async(req,res)=>{
    const { name } = req.body;
    const { id } = req.params;

    try {
        const folder = await Folder.findByIdAndUpdate(id, { name });

        if (!folder) {
            return res.status(404).json({ message: 'Carpeta no encontrada' });
        }

        res.json(folder);
    } catch (error) {
        console.error(error);
    }
}


const deleteFolder=async(req,res)=>{
    const { id } = req.params;

    try {
        const folder = await Folder.findByIdAndDelete(id);

        
        if (!folder) {
            return res.status(404).json({ message: 'Carpeta no encontrada' });
        }
        
        await Carta.deleteMany({folder_id:id});
        
        res.json({ message: 'Carpeta eliminada exitosamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al eliminar la carpeta' });
    }
}


module.exports={
    createFolder,
    getFolders,
    updateFolder,
    deleteFolder
}