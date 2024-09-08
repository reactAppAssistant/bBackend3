const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Registration Route
router.post('/register', userController.register);

// Login Route
router.post('/login', userController.login);

// Logout Route
router.post('/logout', userController.logout);

// Check if user is logged in
router.post('/isLoggedIn', userController.isLoggedIn);

// Route to get all users
router.get('/getAllUsers', userController.getAllUsers);

// Route to get all users
router.get('/getUserByEmail/:email', userController.getUserByEmail);

// Route to follow a user by email
router.post('/followUser', userController.followUser);

// Route to unfollow a user by email
router.post('/unfollowUser', userController.unfollowUser);

// Route to check if a user is following another user by email
router.post('/isFollowing', userController.isFollowing);

// New Route to update user profile
router.post('/updateUserProfile', userController.updateUserProfile);

module.exports = router;
