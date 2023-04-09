const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
  userName: String,
  level: Number,
  points: Number,
  roomID: String,
  colorId:String
});

const UserModel = mongoose.model("user", userSchema);
module.exports = { UserModel };
