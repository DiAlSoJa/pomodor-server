const mongoose = require('mongoose');

const folderSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  name: { type: String, required: true, unique: true }, // Cambiado a "required" para evitar nombres vacíos,
  created_at: { type: Date, default: Date.now },
});

folderSchema.pre('save', async function (next) {
  try {
      if (!this.name) {
          // Si no se proporciona un nombre, establecerlo como "newFile"
          this.name = 'newFile';
      }

      const existingFolder = await this.constructor.findOne({ user_id: this.user_id, name: this.name });

      if (existingFolder) {
          // Si ya existe una carpeta con el mismo nombre, encontrar un nombre único
          let suffix = 2;
          let newName = `${this.name}${suffix}`;

          while (await this.constructor.findOne({ user_id: this.user_id, name: newName })) {
              suffix++;
              newName = `${this.name}${suffix}`;
          }

          this.name = newName;
      }

      next();
  } catch (error) {
      next(error);
  }
});


module.exports =mongoose.model('Folder', folderSchema);




const Folder = mongoose.model('Folder', folderSchema);

module.exports = Folder;