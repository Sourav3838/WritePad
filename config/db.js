const mongoose = require("mongoose");
//dealing with promises
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      //necessary flags
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
    //host connection.
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    //if connection is not made successfully
    console.error(err);
    process.exit(1); //1 represents failure
  }
};

module.exports = connectDB;
