const express = require("express");
const cors = require('cors');

const dotenv = require("dotenv");

const dbConnection = require("./src/dbConnection");
const signupController = require("./src/controllers/signup");
const loginController = require("./src/controllers/login");
const imageController = require("./src/controllers/Image"); // Add image controller
const otpController = require("./src/controllers/otp");

const app = express();



dotenv.config();
app.use(express.json());
app.use(cors())

const PORT = process.env.PORT || 8000;

app.post("/signup", signupController);
app.post("/login",loginController)
app.get("/:category", imageController.getImagesByCategory);
app.post("/send-otp", otpController.sendOTP);
app.post("/validate-otp", otpController.validateOTP); 


dbConnection(process.env.DB_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is listening on port ${8000}`);
    });
  })
