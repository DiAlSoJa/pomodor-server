const Usuario= require("../models/usuario");


const existeUsuarioPorId = async(id)=>{
    const existeUsuario = await Usuario.findById(id);

    if(!existeUsuario) throw new Error(`El Usuario id=${id} no existe`);
}

module.exports = {
    existeUsuarioPorId
}

