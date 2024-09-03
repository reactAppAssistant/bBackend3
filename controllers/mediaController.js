// // controllers/mediaController.js
// const multer = require('multer');
// const { bucket } = require('../firebaseConfig');
// const Media = require('../models/Media');
// const { v4: uuidv4 } = require('uuid');

// // Configure multer
// const upload = multer({
//   storage: multer.memoryStorage(),
// });

// // Upload Image
// exports.uploadImage = async (req, res) => {
//   try {
//     const { email } = req.body;

//     if (!req.file) {
//       return res.status(400).json({ error: 'No file uploaded' });
//     }

//     const blob = bucket.file(`images/${uuidv4()}_${req.file.originalname}`);
//     const blobStream = blob.createWriteStream({
//       metadata: {
//         contentType: req.file.mimetype,
//       },
//     });

//     blobStream.on('error', (err) => {
//       res.status(500).json({ error: err.message });
//     });

//     blobStream.on('finish', async () => {
//       await blob.makePublic();

//       const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;

//       const media = new Media({
//         email,
//         url: publicUrl,
//         type: 'image',
//       });

//       await media.save();
//       res.status(201).json(media);
//     });

//     blobStream.end(req.file.buffer);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// // Upload Video
// exports.uploadVideo = async (req, res) => {
//   try {
//     const { email } = req.body;

//     if (!req.file) {
//       return res.status(400).json({ error: 'No file uploaded' });
//     }

//     const blob = bucket.file(`videos/${uuidv4()}_${req.file.originalname}`);
//     const blobStream = blob.createWriteStream({
//       metadata: {
//         contentType: req.file.mimetype,
//       },
//     });

//     blobStream.on('error', (err) => {
//       res.status(500).json({ error: err.message });
//     });

//     blobStream.on('finish', async () => {
//       await blob.makePublic();

//       const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;

//       const media = new Media({
//         email,
//         url: publicUrl,
//         type: 'video',
//       });

//       await media.save();
//       res.status(201).json(media);
//     });

//     blobStream.end(req.file.buffer);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// // Delete Media
// exports.deleteMedia = async (req, res) => {
//     try {
//       const { email, url } = req.body;
  
//       if (!email || !url) {
//         return res.status(400).json({ error: 'Email and URL are required' });
//       }
  
//       // Extract the file name from the URL
//       const fileName = url.split('/').pop();
  
//       // Reference to the file in Firebase Storage
//       const file = bucket.file(fileName);
  
//       // Delete the file
//       await file.delete();
  
//       // Remove the media entry from the database
//       await Media.findOneAndDelete({ email, url });
  
//       res.status(200).json({ message: 'File deleted successfully' });
//     } catch (err) {
//       res.status(500).json({ error: err.message });
//     }
//   };

// // Multer middleware
// exports.uploadMiddleware = upload.single('file');


// controllers/mediaController.js
const multer = require('multer');
const { bucket } = require('../firebaseConfig');
const Media = require('../models/Media');
const { v4: uuidv4 } = require('uuid');

// Configure multer
const upload = multer({
  storage: multer.memoryStorage(),
});

// Upload Image
exports.uploadImage = async (req, res) => {
  try {
    const { email } = req.body;

    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const filename = `${uuidv4()}_${req.file.originalname}`;
    const blob = bucket.file(`images/${filename}`);
    const blobStream = blob.createWriteStream({
      metadata: {
        contentType: req.file.mimetype,
      },
    });

    blobStream.on('error', (err) => {
      res.status(500).json({ error: err.message });
    });

    blobStream.on('finish', async () => {
        await blob.makePublic();
      const publicUrl = `https://storage.googleapis.com/${bucket.name}/images/${filename}`;

      const media = new Media({
        email,
        url: publicUrl,
        type: 'image',
        filename,
      });

      await media.save();
      res.status(201).json({ filename });
    });

    blobStream.end(req.file.buffer);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Upload Video
exports.uploadVideo = async (req, res) => {
  try {
    const { email } = req.body;

    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const filename = `${uuidv4()}_${req.file.originalname}`;
    const blob = bucket.file(`videos/${filename}`);
    const blobStream = blob.createWriteStream({
      metadata: {
        contentType: req.file.mimetype,
      },
    });

    blobStream.on('error', (err) => {
      res.status(500).json({ error: err.message });
    });

    blobStream.on('finish', async () => {
        await blob.makePublic();
      const publicUrl = `https://storage.googleapis.com/${bucket.name}/videos/${filename}`;

      const media = new Media({
        email,
        url: publicUrl,
        type: 'video',
        filename,
      });

      await media.save();
      res.status(201).json({ filename });
    });

    blobStream.end(req.file.buffer);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete Media
exports.deleteImage = async (req, res) => {
  try {
    const { email, filename } = req.body;

    if (!filename) {
      return res.status(400).json({ error: 'Filename is required' });
    }

    // const filePath = filename.includes('images/') ? `images/${filename}` : `videos/${filename}`;
    // console.log(filePath);
    const file = bucket.file(`images/${filename}`);

    await file.delete();

    await Media.deleteOne({ email, filename });
    res.status(200).json({ message: 'File deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.deleteVideo = async (req, res) => {
    try {
      const { email, filename } = req.body;
  
      if (!filename) {
        return res.status(400).json({ error: 'Filename is required' });
      }
  
      // const filePath = filename.includes('images/') ? `images/${filename}` : `videos/${filename}`;
      // console.log(filePath);
      const file = bucket.file(`videos/${filename}`);
  
      await file.delete();
  
      await Media.deleteOne({ email, filename });
      res.status(200).json({ message: 'File deleted successfully' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
// Multer middleware
exports.uploadMiddleware = upload.single('file');

