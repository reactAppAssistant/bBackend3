const bcrypt = require('bcryptjs');
const User = require('../models/User');

// Register a new user
// exports.register = async (req, res) => {
//   const { fullName, email, password, confirmPassword } = req.body;

//   if (password !== confirmPassword) {
//     console.log('Password:', password);
// console.log('Confirm Password:', confirmPassword);
//     return res.status(400).json({ message: 'Passwords do not match' });
//   }

//   try {
//     const username = email.split('@')[0];

//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ message: 'User already exists' });
//     }

//     console.log(password);

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const newUser = new User({
//       fullName,
//       username,
//       email,
//       password: hashedPassword,
//       isLoggedIn: true,  // Set isLoggedIn to true upon successful registration
//     });

//     await newUser.save();
//     res.status(201).json({ message: 'User registered successfully', isLoggedIn: true, email: email });
//   } catch (err) {
//     res.status(500).json({ message: 'Server error', error: err.message });
//   }
// };

// Register a new user
exports.register = async (req, res) => {
  const { fullName, email, password, confirmPassword, tagline, profession, dateOfBirth, country, profileImageUrl, coverImageUrl } = req.body;

  if (password !== confirmPassword) {
    return res.status(400).json({ message: 'Passwords do not match' });
  }

  try {
    const username = email.split('@')[0];
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      fullName,
      username,
      email,
      password: hashedPassword,
      isLoggedIn: true,  // Set isLoggedIn to true upon successful registration
      tagline,
      profession,
      dateOfBirth,
      country,
      profileImageUrl,
      coverImageUrl
    });

    await newUser.save();
    res.status(201).json({ message: 'User registered successfully', isLoggedIn: true, email: email });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};


// Login a user
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'User does not exist' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    if (user.isLoggedIn) {
      return res.status(400).json({ message: 'User is already logged in on another device' });
    }

    user.isLoggedIn = true;  // Set isLoggedIn to true upon successful login
    await user.save();

    res.json({ message: 'Login successful', isLoggedIn: true, email: email });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Logout a user
exports.logout = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'User does not exist' });
    }

    if (user.isLoggedIn) {
      user.isLoggedIn = false;  // Set isLoggedIn to false upon logout
      await user.save();
      res.json({ message: 'Logged out successfully', isLoggedIn: false });
    } else {
      res.status(400).json({ message: 'User is already logged out' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Check if a user is logged in
exports.isLoggedIn = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'User does not exist' });
    }

    res.json({ isLoggedIn: user.isLoggedIn });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};


// Get a list of all users with their names and usernames
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, 'fullName username email followers following');  // Fetch fullName and username fields only
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Get user details by email
exports.getUserByEmail = async (req, res) => {
  const { email } = req.params;  // Get the email from the request parameters

  try {
    const user = await User.findOne({ email }, 'fullName username email followers following tagline profession dateOfBirth country profileImageUrl coverImageUrl');  // Fetch fullName, username, and email fields

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Follow a user by email
exports.followUser = async (req, res) => {
  const { currentUserEmail, targetUserEmail } = req.body;

  try {
    const currentUser = await User.findOne({ email: currentUserEmail });
    const targetUser = await User.findOne({ email: targetUserEmail });

    if (!currentUser || !targetUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (currentUser.following.includes(targetUser.email)) {
      return res.status(400).json({ message: 'You are already following this user' });
    }

    currentUser.following.push(targetUser.email);
    targetUser.followers.push(currentUser.email);

    await currentUser.save();
    await targetUser.save();

    res.json({ message: 'User followed successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Unfollow a user by email
exports.unfollowUser = async (req, res) => {
  const { currentUserEmail, targetUserEmail } = req.body;

  try {
    const currentUser = await User.findOne({ email: currentUserEmail });
    const targetUser = await User.findOne({ email: targetUserEmail });

    if (!currentUser || !targetUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    currentUser.following.pull(targetUser.email);
    targetUser.followers.pull(currentUser.email);

    await currentUser.save();
    await targetUser.save();

    res.json({ message: 'User unfollowed successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Check if a user is following another user by email
exports.isFollowing = async (req, res) => {
  const { currentUserEmail, targetUserEmail } = req.body;

  try {
    const currentUser = await User.findOne({ email: currentUserEmail });
    const targetUser = await User.findOne({ email: targetUserEmail });

    if (!currentUser || !targetUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isFollowing = currentUser.following.includes(targetUser.email);
    res.json({ isFollowing });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Update user profile
exports.updateUserProfile = async (req, res) => {
  const { email, tagline, profession, dateOfBirth, country, profileImageUrl, coverImageUrl } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.tagline = tagline || user.tagline;
    user.profession = profession || user.profession;
    user.dateOfBirth = dateOfBirth || user.dateOfBirth;
    user.country = country || user.country;
    user.profileImageUrl = profileImageUrl || user.profileImageUrl;
    user.coverImageUrl = coverImageUrl || user.coverImageUrl;

    await user.save();

    res.json({ message: 'User profile updated successfully', user });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
