const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');


// Get all messages
// router.get('/getMessages', messageController.getMessages);

// Send a message
router.post('/sendMessage', messageController.sendMessage);


module.exports = router;