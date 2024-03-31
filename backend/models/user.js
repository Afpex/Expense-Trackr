// models/user.js

import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  passwordResetToken: String,
  passwordResetTokenExpiration: Date
  // Add more fields as needed
});

const User = mongoose.model('User', userSchema);

export default User;
