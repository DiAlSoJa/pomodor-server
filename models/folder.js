const mongoose = require('mongoose');

const folderSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  name: {type:String, require: true},
  created_at: { type: Date, default: Date.now },
});

const Folder = mongoose.model('Folder', folderSchema);

module.exports = Folder;