const jwt = require("jsonwebtoken");
const {response,request} = require("express");
const admin = require("../models/admin");
require("dotenv").config();

const validarJwt = async(req=request,res=response,next)=>{
    const token = req.header("x-token");

    if(!token){
        return res.status(401).json({
            mensage: "No hay token"
        });
    }

    try {
        const {uid} =  jwt.verify(token,process.env.JWT_SECRET);

        const usuarioAuth = await admin.findById(uid);
        
        if(!usuarioAuth){
            
            return res.status(401).json({
                mensage: "Token || usuario no es valido"
            });
        }

        req.body.user = usuarioAuth;
        next();

    } catch (error) {
        return res.status(401).json({
            mensage: "Token no es valido"
        });
    }
}

const generarJwt=(uid)=>{

    return new Promise( (resolve,reject)=>{
        
    
        jwt.sign({uid},process.env.JWT_SECRET,{
            expiresIn: "1d"
        },(err,token)=>{
            if(err){
                console.log(err);
                reject("No se pudo generar el token");
            }else{
                resolve(token);
            }
        });

    });
}


module.exports={
    generarJwt,
    validarJwt
}