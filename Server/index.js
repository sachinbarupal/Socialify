// For Creating HTTP Server
const express = require("express");
const app = express();
const cors = require("cors");

// For storing secret variable in the env so that no one can see them
require("dotenv").config();

// For security purpose for the request headers
const helmet = require("helmet");

// For keeping track of requests, response time etc.
const morgan = require("morgan");

// Connect to Database
const connectToDB = require("./config/database");
const cloudinaryConnect = require("./config/cloudinary");

connectToDB();
cloudinaryConnect();

// Middlewares
app.use(cors());
app.use(
  express.json({
    limit: "50mb",
  })
);

const fileUpload = require("express-fileupload");
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

// for header security
app.use(helmet());
// Logs requests
app.use(morgan("common"));

// Routes
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
const postRoutes = require("./routes/posts");
const uploadRoutes = require("./routes/fileUpload");

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/upload", uploadRoutes);

const PORT = process.env.PORT || 6000;
// Start Server at PORT
app.listen(PORT, () => {
  console.log(`Server is Running at ${PORT}`);
});
