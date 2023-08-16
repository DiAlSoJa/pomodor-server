const createFolder=(req,res)=>{
    res.json({msg:"post"})
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