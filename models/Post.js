const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  username: { type: String, required: true },
  email: { type: String, required: true },
  profileImageUrl: {type: String, required: true},
  imageUrl: { type: String, default: "" },  // Add imageUrl field
  content: { type: String, default:""},
  reactions: { type: Map, of: Number, default: {} }, // Map to store reactions and their counts
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Post', postSchema);
