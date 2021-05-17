const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ReviewSchema = new Schema(
  {
    customerPhoto: {
      type: String,
      required: true
    },

    customerName: {
      type: String,
      required: true
    },

    carInfo: {
      type: String,
      required: true
    },

    reviewText: {
      type: String,
      required: true
    },

    date: {
      type: Date,
      default: Date.now
    }
  }
);

module.exports = Review = mongoose.model("reviews", ReviewSchema);
