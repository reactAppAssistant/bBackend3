const mongoose = require('mongoose');

// const userSchema = new mongoose.Schema({
//   fullName: { type: String, required: true },
//   username: { type: String, unique: true, required: true },
//   email: { type: String, unique: true, required: true },
//   password: { type: String, required: true },
//   isLoggedIn: { type: Boolean, default: false },  // Add isLoggedIn field
// });

// const userSchema = new mongoose.Schema({
//   fullName: { type: String, required: true },
//   username: { type: String, unique: true, required: true },
//   email: { type: String, unique: true, required: true },
//   password: { type: String, required: true },
//   isLoggedIn: { type: Boolean, default: false },
//   following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],  // Users this user is following
//   followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],  // Users following this user
// });

const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  username: { type: String, unique: true, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  isLoggedIn: { type: Boolean, default: false },
  following: [{ type: String }],  // List of emails this user is following
  followers: [{ type: String }],  // List of emails of users following this user
});



module.exports = mongoose.model('User', userSchema);
