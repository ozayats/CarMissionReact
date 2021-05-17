const express = require("express");
const router = express.Router();
const passport = require("passport");

//Import controllers
const { addInvite, validateInvite } = require("../controllers/invites");

// @route   GET /invite
// @desc    GET existing navbar items
// @access  Public
router.post("/validate", validateInvite);

// @route   POST /navbar
// @desc    Create new navbar item
// @access  Private
router.post("/", passport.authenticate("jwt", { session: false }), addInvite);

// @route   PUT /navbar/:id
// @desc    Update existing navbar item
// @access  Private
// router.put(
//   "/:id",
//   passport.authenticate("jwt", { session: false }),
//   updateNavbarItem
// );

// @route   DELETE /navbar/:id
// @desc    DELETE existing navbar item
// @access  Private
// router.delete(
//   "/:id",
//   passport.authenticate("jwt", { session: false }),
//   deleteNavbarItem
// );

module.exports = router;
