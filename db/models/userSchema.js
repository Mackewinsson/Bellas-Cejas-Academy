const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true, trim: true },
  name: { type: String, required: true, trim: true },
  password: { type: String, required: true },
});

// authentica input against db docs
userSchema.statics.authenticate = function (email, password, callback) {
  User.findOne({ email: email }).exec(function (error, user) {
    if (error) {
      return callback(error);
    } else if (!user) {
      const err = new Error("User not found");
      err.status = 401;
      return callback(err);
    }
    bcrypt.compare(password, user.password, function (error, result) {
      if (result === true) {
        return callback(null, user);
      } else {
        return callback();
      }
    });
  });
};
//Use regular function for it to work (not arraw function)
userSchema.pre("save", function (next) {
  const user = this;
  bcrypt.hash(user.password, 10, (err, hash) => {
    if (err) {
      return next(err);
    }
    user.password = hash;
    next();
  });
});

const User = mongoose.model("User", userSchema);

module.exports = User;
