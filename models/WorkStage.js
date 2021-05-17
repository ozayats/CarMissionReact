const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const WorkStageSchema = new Schema({
  num: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  iconSrc: {
    type: String,
    default: "",
  },
});

module.exports = WorkStage = mongoose.model("work-stage", WorkStageSchema);
