const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  folder_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Folder' },
  content: {type:String,require:true},
  created_at: { type: Date, default: Date.now },
  last_reviewed_at: {type:Date,default:Date.now},
  interval: {type:String,default: "10m"}
});

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;