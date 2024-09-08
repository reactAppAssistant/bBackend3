const express = require('express');
const router = express.Router();
const conversationController = require('../controllers/conversationController');
const Conversation = require('../models/Conversation'); // Define this model

// Route to start a conversation between two users
router.post('/start', conversationController.startConversation);

// Route to get messages for a specific conversation
router.get('/:conversationId/messages', conversationController.getConversationMessages);

// Route to get all conversations (optional, if you need this)
router.get('/getAllConversations', async (req, res) => {
  try {
    const conversations = await Conversation.find();
    res.json(conversations);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

router.get('/getSpecificConversation', async (req, res) => {
  const { currentUserEmail } = req.query; // Get the current user's email from the query parameters

  try {
    // Find conversations where the first participant (user1Email) matches currentUserEmail
    const conversations = await Conversation.find({
      'participants.0': currentUserEmail // 'participants.0' references the first element of the participants array
    });

    if (conversations.length === 0) {
      return res.status(404).json({ message: 'No conversations found for this user.' });
    }

    // Return the conversations found
    res.json(conversations);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;
