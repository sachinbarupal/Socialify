// For Creating HTTP Server
const express = require("express");
const app = express();

// For storing secret variable in the env so that no one can see them
const dotenv = require("dotenv");

// For security purpose for the request headers
const helmet = require("helmet");

// For keeping track of requests, response time etc.
const morgan = require("morgan");

// Use dotenv
dotenv.config();

// Connect to Database
const connectToDB = require("./config/database");
connectToDB();

// Middlewares

// Body Parser
app.use(express.json());
// for header security
app.use(helmet());
// Logs requests
app.use(morgan("common"));

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
