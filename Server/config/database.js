// For connecting to MongoDb
const mongoose = require("mongoose");

const connectToDB = () => {
  mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log("DataBase Connection Successfull"))
    .catch((err) => {
      console.log("Error in connecting to Database : ", err);
      process.exit(1);
    });
};

//Export the function
module.exports = connectToDB;
