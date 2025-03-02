import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';

// Initialize Express
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware (Must be before defining routes)
app.use(cors());
app.use(bodyParser.json());

// Test Route
app.get("/", (req, res) => {
  res.send("Welcome to Instagram-clone API");
});

// ✅ Ensure this `/login` route exists
app.post("/login", (req, res) => {
  console.log("Request received at /login:", req.body);
  res.json({ message: "Login route is working!" });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
