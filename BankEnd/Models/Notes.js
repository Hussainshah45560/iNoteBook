const mongoose = require('mongoose');
const { Schema } = mongoose;

const NotesSchema = new Schema({
  user:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  tag: {
    type: String,
    default: 'general'
  },
  date: {
    type: Date, // Corrected to use Date
    default: Date.now // Corrected to use Date.now
  }
});

// Correctly create and export the model
const Notes = mongoose.model('Notes', NotesSchema);

module.exports = Notes; // Use export default for ES module syntax
