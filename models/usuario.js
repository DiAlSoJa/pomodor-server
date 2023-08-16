const {Schema,model} = require("mongoose");

const usuarioSchema = new Schema({
    username:{type:String,default: "NewUser"},
    email: {type: String, require: true},
    password:{type:String, require: true},
    created_at:{type: Date, default: Date.now()}
});

module.exports = model("Usuario",usuarioSchema);