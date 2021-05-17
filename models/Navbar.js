const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const NavbarSchema = new Schema({
  textContent: {
    type: String,
    required: true,
  },
  headerLocation: {
    type: String,
    required: true,
  },
  footerLocation: {
    type: String,
    required: true,
  },
  numberInNavbar: {
    type: String,
    required: true,
  },
  sectionId: {
    type: String,
  },
  contacts: {
    type: String,
  },
});
console.log();

module.exports = Navbar = mongoose.model("Navbar", NavbarSchema);
