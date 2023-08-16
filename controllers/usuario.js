const Usuario = require("../models/usuario");
const {generarJwt} = require("../helpers/jsonwebtoken");

//crear usuario
const createUser=async(req,res)=>{
    const {username,email,password} = req.body;
    
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password,salt);
    const usuario = new Usuario({username,email,password:hashedPassword});

    await usuario.save();

    res.json(usuario);
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
const getUsers=async(req,res)=>{
    const { limite = 8, desde = 0 } = req.query;

    const [ total,admins ] = await Promise.all([
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

const updateUser=async(req,res)=>{
    const {id} = req.params;
    const {username,email,password} = req.body;

    const usuario = await Usuario.find({email});

    if(username) usuario.username=username;
    if(email) usuario.email=email;
    if(password){

    }
    await usuario.save();


    res.json({
        id,
        usuario
    });
}

const deleteUser=async(req,res)=>{
    const {id} = req.params;

    const usuario= await Usuario.findByIdAndDelete(id);
    res.json({
        usuario
    });
}


module.exports={
    createUser,
    getUsers,
    updateUser,
    deleteUser,
    authUser
}