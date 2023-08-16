const Usuario= require("../models/usuario");
const Folder = require("../models/folder");

const existeUsuarioPorId = async(id)=>{
    const existeUsuario = await Usuario.findById(id);

    if(!existeUsuario) throw new Error(`El Usuario id=${id} no existe`);
}
const existeFolderPorId = async(id)=>{
    const existeFolder = await Folder.findById(id);

    if(!existeFolder) throw new Error(`El Folder id=${id} no existe`);
}

module.exports = {
    existeUsuarioPorId,
    existeFolderPorId
}

