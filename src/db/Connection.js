const mongoose = require('mongoose');

const accessEnv = require('../utils/AccessEnv');

const DB_URI = accessEnv('DB_URI');

const connectToDb = async () => {
  try {
    await mongoose.connect(DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`Connected to DB`);
  } catch (err) {
    console.log(err);
    // throw new Error()
  }
};

module.exports = { connectToDb };
