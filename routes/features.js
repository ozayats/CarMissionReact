const express = require("express");
const router = express.Router();
const passport = require("passport");

//Import controllers
const {
  addFeature,
  getFeatures,
  updateFeature,
  deleteFeature,
  uploadFeatureImg,
} = require("../controllers/features");

// @route   POST api/features
// @desc    Create new category
// @access  Private
router.post("/", passport.authenticate("jwt", { session: false }), addFeature);

// @route   POST /features
// @desc    Upload img to Amazon S3 and update url in DB
// @access  Private
router.post(
  "/upload/:id",
  passport.authenticate("jwt", { session: false }),
  uploadFeatureImg
);

// @route   GET api/features
// @desc    GET existing categories
// @access  Public
router.get("/", getFeatures);

// @route   PUT api/features/:id
// @desc    Update existing comment
// @access  Private
router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  updateFeature
);

// @route   DELETE api/features/:id
// @desc    Delete existing comment
// @access  Private
router.delete(
  "/delete/:id",
  passport.authenticate("jwt", { session: false }),
  deleteFeature
);

module.exports = router;
