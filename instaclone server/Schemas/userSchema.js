const mongoose = require("mongoose");

const userdetailsSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});
module.exports = mongoose.model("user_details_schema", userdetailsSchema);
