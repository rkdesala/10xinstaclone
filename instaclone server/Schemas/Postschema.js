const mongoose = require("mongoose");

const postdetailsSchema = new mongoose.Schema({
  title: String,
  body: String,
  imagefile: String,
  time: String,
  owner: String,
});
module.exports = mongoose.model("post_details_schema", postdetailsSchema);
