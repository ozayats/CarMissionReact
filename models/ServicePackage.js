const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ServicePackageSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },

    price: {
      type: Number,
      required: true
    },

    currency: {
      type: String,
      required: true
    },

    serviceList: [{
      type: String,
      required: true
    }],

    date: {
      type: Date,
      default: Date.now
    }
  }
);

module.exports = ServicePackage = mongoose.model("services", ServicePackageSchema);
