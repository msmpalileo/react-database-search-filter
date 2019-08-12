const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const profileSchema = new Schema({
  street: String,
  city: String,
  state: String,
  zip: String,
  rent: Number,
  userID: String
});

module.exports = mongoose.model("Profile", profileSchema);
