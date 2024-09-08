// const mongoose = require('mongoose');


// const userSchema = new mongoose.Schema({
//   fullName: { type: String, required: true },
//   username: { type: String, unique: true, required: true },
//   email: { type: String, unique: true, required: true },
//   password: { type: String, required: true },
//   isLoggedIn: { type: Boolean, default: false },
//   following: [{ type: String }],  // List of emails this user is following
//   followers: [{ type: String }],  // List of emails of users following this user
// });



// module.exports = mongoose.model('User', userSchema);


const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  username: { type: String, unique: true, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  isLoggedIn: { type: Boolean, default: false },
  following: [{ type: String }],  // List of emails this user is following
  followers: [{ type: String }],  // List of emails of users following this user
  // New fields
  tagline: { type: String, default: '' },
  profession: { type: String, default: '' },
  dateOfBirth: { type: Date },
  country: { type: String, default: '' },
  profileImageUrl: { type: String, default: '' }, // URL for the profile image
  coverImageUrl: { type: String, default: '' },   // URL for the cover image
});

module.exports = mongoose.model('User', userSchema);
