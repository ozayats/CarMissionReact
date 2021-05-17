const express = require("express");
const router = express.Router();
const passport = require("passport");

//Import controllers
const {
  addWorkStage,
  getWorkStages,
  updateWorkStage,
  deleteWorkStage,
  uploadWorkStageImg,
} = require("../controllers/workStages");

// @route   POST /work-stages
// @desc    Create new work stage
// @access  Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  addWorkStage
);

// @route   POST /work-stages
// @desc    Upload img to Amazon S3 and update url in DB
// @access  Private
router.post(
  "/upload/:id",
  passport.authenticate("jwt", { session: false }),
  uploadWorkStageImg
);

// @route   GET /work-stages
// @desc    GET existing stages
// @access  Public
router.get("/", getWorkStages);

// @route   PUT /work-stages
// @desc    Update stage from collection by id
// @access  Private
router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  updateWorkStage
);

// @route   DELETE /work-stages
// @desc    Delete stage from collection by id
// @access  Private
router.delete(
  "/delete/:id",
  passport.authenticate("jwt", { session: false }),
  deleteWorkStage
);

module.exports = router;
