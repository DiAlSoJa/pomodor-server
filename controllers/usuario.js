const Usuario = require("../models/usuario");
const Folder = require("../models/folder");
const {generarJwt} = require("../helpers/jsonwebtoken");
const bcrypt = require("bcrypt");
//crear usuario
const createUser=async(req,res)=>{
    const { username, email, password } = req.body;

    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const usuario = new Usuario({ username, email, password: hashedPassword });
        await usuario.save();

        // Crear una carpeta asociada al usuario
        const folder = new Folder({ user_id: usuario._id, name: username+"Folder" });
        await folder.save();

        const token = await generarJwt(usuario._id);

        res.status(200).json(token);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al crear el usuario' });
    }
}


//iniciar sesion
const authUser = async(req,res)=>{
    const {email,password} = req.body;


    const user = await Usuario.findOne({email});
    
    if(!user  ){
        return res.status(400).json({
            mensage:"Credenciales invalidas"
        });
    }
    const validPassword = await bcrypt.compare(password,user.password);

    if( !validPassword){
        return res.status(400).json({
            mensage:"Credenciales invalidas"
        });
    }
    const token= await generarJwt(user._id);

    res.json({
        msg: "ok",
        user,
        token
    });
}

//obtener usuarios
const getUsers=async(req,res)=>{
    const { limite = 8, desde = 0 } = req.query;

    const [ total,usuarios ] = await Promise.all([
        Usuario.countDocuments(),
        Usuario.find()
            .skip( Number( desde ) )
            .limit(Number( limite ))
    ]);

    res.json({
        total,
        usuarios
    });
}
const getMe=async(req,res)=>{
    const { _id,username,correo } = req.body.user;


    res.json({
        _id,
        username,
        correo
    });
}

//actualizar usuario
const updateUser=async(req,res)=>{
    const { id } = req.params;
    const { username, email, password} = req.body;

    try {
        let usuario = await Usuario.findOne({ _id: id });

        if (!usuario) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        if (username) usuario.username = username;
        if (email) usuario.email = email;

        if (password) {
            // const passwordMatch = await bcrypt.compare(password, usuario.password);
            // if (!passwordMatch) {
            //     return res.status(400).json({ error: 'La contraseña actual no es correcta' });
            // }

            const hashedNewPassword = await bcrypt.hash(password, 10);
            usuario.password = hashedNewPassword;
        }

        await usuario.save();

        res.json({
            id,
            usuario
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}


//eliminar usuario
const deleteUser = async (req, res) => {
    const { id } = req.params;

    try {
        // Buscar el usuario para obtener su id
        const usuario = await Usuario.findById(id);

        if (!usuario) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        // Eliminar todas las carpetas asociadas al usuario
        await Folder.deleteMany({ user_id: usuario._id });

        // Eliminar el usuario
        await usuario.deleteOne();

        res.json({
            message: 'Usuario eliminado junto con sus carpetas asociadas'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al eliminar el usuario' });
    }
}
module.exports={
    createUser,
    getUsers,
    updateUser,
    deleteUser,
    authUser,
    getMe
}