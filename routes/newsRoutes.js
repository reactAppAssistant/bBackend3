const express = require('express');
const router = express.Router();
const newsController = require('../controllers/newsController');

// Route to add a news item
router.post('/news', newsController.addNews);

// Route to fetch all news items
router.get('/news', newsController.getAllNews);

// Route to fetch all news items by email
router.get('/news/byEmail/:email', newsController.getNewsByEmail);

// Route to update a news item by email
router.put('/news/updateByEmail/:email', newsController.updateNewsByEmail);

// Route to delete a news item by email
router.delete('/news/deleteByEmail/:email', newsController.deleteNewsByEmail);

module.exports = router;
