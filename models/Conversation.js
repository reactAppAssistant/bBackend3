const mongoose = require('mongoose');

const ConversationSchema = new mongoose.Schema({
  participants: [String],
  messages: [
    {
      text: String,
      user: String,
      imageUrl: String,
      createdAt: { type: Date, default: Date.now }
    }
  ]
});

module.exports = mongoose.model('Conversation', ConversationSchema);
