const jwt = require("jsonwebtoken");

const userAuth = (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (!token) return res.status(403).json({ msg: "Invalid Token" });

    const validate = jwt.verify(token, process.env.JWT_SECRET);
    if (!validate.email) return res.status(403).json({ msg: "Invalid Token" });

    req.email = validate.email;
    req._id = validate._id;
    next();
  } catch (err) {
    console.log("Error in UserAuth", err);
    res.status(403).json({ msg: "Error in UserAuth" });
  }
};

module.exports = userAuth;
