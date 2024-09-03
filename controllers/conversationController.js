const Conversation = require('../models/Conversation'); // Define this model
const User = require('../models/User');

// Start a conversation
exports.startConversation = async (req, res) => {
  const { user1Email, user2Email } = req.body;

  try {
    // Create or find a conversation between user1 and user2
    let conversation = await Conversation.findOne({
      participants: { $all: [user1Email, user2Email] }
    });

    if (!conversation) {
      conversation = new Conversation({
        participants: [user1Email, user2Email],
        messages: []
      });
      await conversation.save();
    }

    res.json(conversation);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Get messages for a conversation
exports.getConversationMessages = async (req, res) => {
  const { conversationId } = req.params;

  try {
    const conversation = await Conversation.findById(conversationId);
    if (!conversation) {
      return res.status(404).json({ message: 'Conversation not found' });
    }

    res.json(conversation.messages);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
