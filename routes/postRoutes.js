const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');

// Publish a new post
router.post('/publish', postController.publishPost);

// Get all posts
router.get('/getAllPosts', postController.getAllPosts);

// Update post reactions
router.post('/updateReactions', postController.updateReactions);

module.exports = router;
