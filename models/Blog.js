const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BlogSchema = new Schema(
  {
    photo: {
      type: String,
    },

    title: {
      type: String,
      required: true
    },

    text: {
      type: String,
      required: true
    },
    fullText: {
      type: String,
      required: true
    },
    buttonText: {
      type: String,
      required: true
    },
    date: {
      type: String,
    }
  }
);

module.exports = Blog = mongoose.model("blogs", BlogSchema);
