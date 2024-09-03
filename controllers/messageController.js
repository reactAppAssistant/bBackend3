const Post = require('../models/Post');
const User = require('../models/User');
const Message = require('../models/Message');
const Conversation = require('../models/Conversation'); // Define this model



// exports.getMessages = async (req, res) => {
//     const messages = await Message.find().sort({ createdAt: -1 }).limit(50);
//     res.json(messages);
// };

// exports.sendMessage = async (req, res) => {
//     const { text, user } = req.body;
//     const message = new Message({ text, user });
//     await message.save();
//     res.status(201).json(message);
// };


exports.sendMessage = async (req, res) => {
    const { conversationId, text, user } = req.body;
  
    try {
      const conversation = await Conversation.findById(conversationId);
      if (!conversation) {
        return res.status(404).json({ message: 'Conversation not found' });
      }
  
      conversation.messages.push({ text, user });
      await conversation.save();
  
      res.status(201).json(conversation.messages[conversation.messages.length - 1]);
    } catch (err) {
      res.status(500).json({ message: 'Server error', error: err.message });
    }
  };
  