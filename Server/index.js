// For Creating HTTP Server
const express = require("express");
const app = express();
const multer = require("multer");
const path = require("path");
const cors = require("cors");

// For storing secret variable in the env so that no one can see them
require("dotenv").config();

// For security purpose for the request headers
const helmet = require("helmet");

// For keeping track of requests, response time etc.
const morgan = require("morgan");

// Connect to Database
const connectToDB = require("./config/database");
connectToDB();

app.use(cors());
app.use("/Images", express.static(path.join(__dirname, "public/Images")));

// Middlewares

// Body Parser
app.use(express.json());
// for header security
app.use(helmet());
// Logs requests
app.use(morgan("common"));

// Setup Upload via Multer
const storage = multer.diskStorage({
  destination: (req, Image, cb) => {
    cb(null, "public/Images");
  },
  filename: (req, Image, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage });

app.post("/api/upload", upload.single("Image"), (req, res) => {
  try {
    res.status(200).json("File Uploaded Successfully");
  } catch (err) {
    console.log("err in upload");
    res.status(403).json("Error Aari");
  }
});

// Routes
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
const postRoutes = require("./routes/posts");

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);

app.get("/", (req, res) => {
  res.send("Welcome My Friend!!");
});

const PORT = process.env.PORT || 6000;
// Start Server at PORT
app.listen(PORT, () => {
  console.log(`Server is Running at ${PORT}`);
});
