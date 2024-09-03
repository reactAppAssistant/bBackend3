// routes/mediaRoutes.js
const express = require('express');
const { uploadImage, uploadVideo, deleteImage, deleteVideo, uploadMiddleware } = require('../controllers/mediaController');

const router = express.Router();

router.post('/uploadImage', uploadMiddleware, uploadImage);
router.post('/uploadVideo', uploadMiddleware, uploadVideo);

// Delete route
router.delete('/deleteImage', deleteImage);
router.delete('/deleteVideo', deleteVideo);

module.exports = router;
