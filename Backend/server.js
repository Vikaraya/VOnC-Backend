const express = require("express");
const cors = require('cors');

const dotenv = require("dotenv");
const cors = require("cors")
const dbConnection = require("./src/dbConnection");
const signupController = require("./src/controllers/signup");
const loginController = require("./src/controllers/login");
const imageController = require("./src/controllers/Image"); // Add image controller

const app = express();
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Parse JSON bodies

dotenv.config();
app.use(express.json());
app.use(cors())

const PORT = process.env.PORT || 8000;

app.post("/signup", signupController);
app.post("/login",loginController)
app.get("/images", imageController.getImages);


dbConnection(process.env.DB_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is listening on port ${8000}`);
    });
  })
