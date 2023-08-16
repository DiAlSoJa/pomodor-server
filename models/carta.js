const mongoose = require('mongoose');

const cartaSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  folder_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Folder' ,require:true},
  front: {type:String,require:true},
  back: {type:String,require:true},
  created_at: { type: Date, default: Date.now },
  last_reviewed_at: {type:Date,default:Date.now},
  interval: {type:String,default: "10m"}
});

const Carta = mongoose.model('Carta', cartaSchema);

module.exports = Carta;