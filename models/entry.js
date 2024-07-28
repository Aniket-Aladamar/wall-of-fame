const mongoose = require('mongoose');

const entrySchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true }
});

const Entry = mongoose.model('Entry', entrySchema);

module.exports = Entry;
