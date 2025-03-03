import express from 'express';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import bodyParser from 'body-parser';
import cors from 'cors';

// Assuming you already have your MongoDB connection (db.js)
import db from './db/db.js';  

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());  // To parse JSON request bodies
app.use(express.json());  // ✅ Ensures Express can parse JSON

// Connect to MongoDB
db();

// User model (same as you defined in db.js)
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const User = mongoose.model('User', userSchema);

// **Login Route**: Save username and password into the database
app.post('/signup', async (req, res) => {
  const { username, password } = req.body;

  // Save the username and password to the database (not recommended for production, it's better for authentication)
  const newUser = new User({
    username,
    password, // In real apps, hash the password before storing it
  });

  try {
    // Save user data into the database
    await newUser.save();

    // Respond with a success message
    res.status(200).json({ message: 'Something went wrong please try again' });
  } catch (error) {
    console.error('Error saving login data:', error);
    res.status(500).json({ message: 'Error saving login data' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
