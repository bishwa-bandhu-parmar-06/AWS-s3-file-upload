const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
  filename: { type: String, required: true },
  originalname: { type: String, required: true },
  mimetype: { type: String, required: true },
  size: { type: Number, required: true, min: 1 },
  location: { type: String, required: true },
  key: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now }
});

fileSchema.index({ createdAt: -1 });
fileSchema.index({ mimetype: 1 });

module.exports = mongoose.model('File', fileSchema);