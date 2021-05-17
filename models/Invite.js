const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const InviteSchema = new Schema({
  uuid: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
});

module.exports = Invite = mongoose.model("invite", InviteSchema);
