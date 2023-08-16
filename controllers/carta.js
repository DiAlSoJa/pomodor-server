const createCarta=(req,res)=>{
    res.json({msg:"post"})
}
const getCartas=(req,res)=>{
    res.json({msg:"get"})
}
const updateCarta=(req,res)=>{
    res.json({msg:"update"})
}
const deleteCarta=(req,res)=>{
    res.json({msg:"delete"})
}


module.exports={
    createCarta,
    getCartas,
    updateCarta,
    deleteCarta
}