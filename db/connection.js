const mongoose = require("mongoose");

const URI =
  "mongodb+srv://Mackewinsson:pale9845**@cursodemongoplatzi.6zvzp.mongodb.net/test?authSource=admin&replicaSet=atlas-mcq2vy-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true";

const connectDb = async () => {
  await mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("DB connected");
};

module.exports = connectDb;
