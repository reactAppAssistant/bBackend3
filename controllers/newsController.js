const News = require('../models/News');

// Add a news item
exports.addNews = async (req, res) => {
  const { title, description, image, email } = req.body;

  try {
    const newNewsItem = new News({
      title,
      description,
      image,
      email, // Save the email of the user who created the news
    });

    const savedNewsItem = await newNewsItem.save();
    res.status(201).json(savedNewsItem);
  } catch (error) {
    res.status(500).json({ message: 'Error adding news', error: error.message });
  }
};

// Fetch all news items
exports.getAllNews = async (req, res) => {
  try {
    const news = await News.find().sort({ createdAt: -1 });
    res.json(news);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching news', error: error.message });
  }
};

// Fetch all news items by email
exports.getNewsByEmail = async (req, res) => {
  const { email } = req.params;

  try {
    const newsItems = await News.find({ email }).sort({ createdAt: -1 });
    if (newsItems.length === 0) {
      return res.status(404).json({ message: 'No news items found for this email' });
    }
    res.json(newsItems);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching news items', error: error.message });
  }
};

// Update a news item by email
exports.updateNewsByEmail = async (req, res) => {
    const { email } = req.params;
    const { title, description, image } = req.body;
  
    try {
      const updatedNewsItem = await News.findOneAndUpdate(
        { email },
        { title, description, image },
        { new: true }
      );
  
      if (!updatedNewsItem) {
        return res.status(404).json({ message: 'News item not found for this email' });
      }
  
      res.json(updatedNewsItem);
    } catch (error) {
      res.status(500).json({ message: 'Error updating news item', error: error.message });
    }
  };
  
  // Delete a news item by email
  exports.deleteNewsByEmail = async (req, res) => {
    const { email } = req.params;
  
    try {
      const deletedNewsItem = await News.findOneAndDelete({ email });
  
      if (!deletedNewsItem) {
        return res.status(404).json({ message: 'News item not found for this email' });
      }
  
      res.json({ message: 'News item deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting news item', error: error.message });
    }
  };