const Post = require('../models/Post');
const User = require('../models/User');

// Publish a new post
exports.publishPost = async (req, res) => {
  const { email, content } = req.body;

  try {
    // Fetch user details
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // const newPost = new Post({
    //   fullName: user.fullName,
    //   username: user.username,
    //   email: user.email,
    //   content,
    //   reactions: { like: 0, love: 0, haha: 0, wow: 0, sad: 0, angry: 0 } // Initialize reactions
    // });

    const newPost = new Post({
        fullName: user.fullName,
        username: user.username,
        email: user.email,
        content,
        reactions: new Map([
          ['thumbsUp', 0],
          ['thumbsDown', 0],
          ['laugh', 0],
          ['love', 0],
          ['angry', 0],
        ]) // Initialize reactions Map with default values
      });
      

    await newPost.save();
    res.status(201).json({ message: 'Post published successfully', post: newPost });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Get all posts
exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ timestamp: -1 }); // Sort by latest posts first
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Update post reactions
// exports.updateReactions = async (req, res) => {
//   const { postId, reactionType } = req.body;

//   try {
//     const post = await Post.findById(postId);
//     if (!post) {
//       return res.status(404).json({ message: 'Post not found' });
//     }

//     if (!post.reactions.hasOwnProperty(reactionType)) {
//       return res.status(400).json({ message: 'Invalid reaction type' });
//     }

//     post.reactions[reactionType] = (post.reactions[reactionType] || 0) + 1;
//     await post.save();
//     res.json({ message: 'Reaction updated', post });
//   } catch (err) {
//     res.status(500).json({ message: 'Server error', error: err.message });
//   }
// };

exports.updateReactions = async (req, res) => {
    const { postId, reactionType } = req.body;
  
    try {
      const post = await Post.findById(postId);
      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }
  
      console.log('Received reactionType:', reactionType);
      console.log('Available reaction types:', Array.from(post.reactions.keys()));
  
      if (!post.reactions.has(reactionType)) {
        return res.status(400).json({ message: 'Invalid reaction type' });
      }
  
      post.reactions.set(reactionType, (post.reactions.get(reactionType) || 0) + 1);
      await post.save();
      res.json({ message: 'Reaction updated', post });
    } catch (err) {
      res.status(500).json({ message: 'Server error', error: err.message });
    }
  };
  