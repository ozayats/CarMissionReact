const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FeatureSchema = new Schema({
  imgPath: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  isMain: {
    type: Boolean,
    default: false,
    required: true,
  },
  text: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});
module.exports = Feature = mongoose.model("features", FeatureSchema);
