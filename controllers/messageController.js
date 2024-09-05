const Post = require('../models/Post');
const User = require('../models/User');
const Message = require('../models/Message');
const Conversation = require('../models/Conversation'); // Define this model


exports.sendMessage = async (req, res) => {
    const { conversationId, text, user, imageUrl} = req.body;
  
    try {
      const conversation = await Conversation.findById(conversationId);
      if (!conversation) {
        return res.status(404).json({ message: 'Conversation not found' });
      }
  
      conversation.messages.push({ text, user, imageUrl});
      await conversation.save();
  
      res.status(201).json(conversation.messages[conversation.messages.length - 1]);
    } catch (err) {
      res.status(500).json({ message: 'Server error', error: err.message });
    }
  };
  