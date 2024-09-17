const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  username: { type: String, required: true },
  email: { type: String, required: true },
  imageUrl: { type: String },  // Add imageUrl field
  content: { type: String, required: true },
  reactions: { type: Map, of: Number, default: {} }, // Map to store reactions and their counts
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Post', postSchema);
