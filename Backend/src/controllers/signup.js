const bcrypt = require("bcryptjs");
const User = require("../models/userSchema"); 
const { validateEmail, validatePassword, validatePhoneNumber } = require("../validation");

const signupController = async (req, res) => {
  const { email, password, phoneNumber } = req.body;

  
  if (!email || !password || !phoneNumber) {
    return res.status(400).json({ message: "Email, password, and phone number are required" });
  }

  
  if (!validateEmail(email)) {
    return res
      .status(400)
      .json({ message: "Please provide a valid email address" });
  }


  if (!validatePassword(password)) {
    return res.status(400).json({
      message:
        "Password must be at least 6 characters long, contain one uppercase letter, one number, and one special character",
    });
  }

  if (!validatePhoneNumber(phoneNumber)) {
    return res.status(400).json({
      message: "Please provide a valid phone number (10 digits required)",
    });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      email,
      password: hashedPassword,
      phoneNumber,
    });

    await newUser.save();

    res.status(201).json({
      message: "User registered successfully",
    });
  } catch (err) {
    console.error("Error during signup:", err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = signupController;
