const AWS = require("aws-sdk");
const dotenv = require("dotenv")
const crypto = require("crypto");
const db = require("../dbConnection");
dotenv.config();


AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: "ap-south-1", 
});

const sns = new AWS.SNS();

let otpCache = {}; 


exports.sendOTP = async (req, res) => {
  const { phoneNumber } = req.body;
  //console.log(phoneNumber)

  if (!phoneNumber) {
    return res.status(400).json({ message: "Phone number is required" });
  }

  // Generate a random 6-digit OTP
  const otp = crypto.randomInt(100000, 999999).toString();
  console.log(otp)

  // Save OTP to database or in-memory cache
  otpCache[phoneNumber] = { otp, expiresAt: Date.now() + 300000 }; // 5 min expiry

  const params = {
    Message: `Your OTP is ${otp}. It will expire in 5 minutes.`,
    PhoneNumber: phoneNumber,
  };

  try {
    await sns.publish(params).promise();
    res.status(200).json({ message: "OTP sent successfully" });
  } catch (error) {
    console.error("Error sending OTP", error);
    res.status(500).json({ message: "Failed to send OTP", error });
  }
};

exports.validateOTP = async (req, res) => {
  const { phoneNumber, otp } = req.body;

  if (!phoneNumber || !otp) {
    return res
      .status(400)
      .json({ message: "Phone number and OTP are required" });
  }

  // Check OTP from database or in-memory cache
  const savedOTP = otpCache[phoneNumber];

  if (!savedOTP) {
    return res
      .status(400)
      .json({ message: "No OTP request found for this phone number" });
  }

  if (savedOTP.otp === otp && savedOTP.expiresAt > Date.now()) {
    delete otpCache[phoneNumber]; // Clear OTP after validation
    return res.status(200).json({ message: "OTP validated successfully" });
  } else {
    return res.status(400).json({ message: "Invalid or expired OTP" });
  }
};
