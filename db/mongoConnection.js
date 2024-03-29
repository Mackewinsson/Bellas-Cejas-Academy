const mongoose = require("mongoose");
require("dotenv").config();

const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const dbName = process.env.DB_NAME;
// FUNCTION TO CONNECTO TO MONGO
async function connectToMongoDb() {
  try {
    await mongoose.connect(
      `mongodb+srv://${dbUser}:${dbPassword}@bellascejas.fn9sf.mongodb.net/${dbName}?retryWrites=true&w=majority`,
      { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }
    );
    console.log("Connected to DB");
  } catch (err) {
    console.error("There is a connection problem to the DB");
    console.error(err);
  }
}
module.exports = connectToMongoDb;
