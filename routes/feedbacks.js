const express = require("express");
const router = express.Router();
const passport = require("passport");

//Import controllers
const {
  createFeedback,
  getFeedbacks,
  deleteFeedback,
} = require("../controllers/feedbacks");

// @route   POST /cart
// @desc    Create cart
// @access  Private
router.post("/", createFeedback);

// @route   DELETE /cart
// @desc    Delete cart (when the order is placed or customer logging out)
// @access  Private
router.delete(
  "/delete/:id",
  passport.authenticate("jwt", { session: false }),
  deleteFeedback
);

// @route   GET /cart
// @desc    Get cart for customer
// @access  Private
router.get("/", passport.authenticate("jwt", { session: false }), getFeedbacks);

module.exports = router;
