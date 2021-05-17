const express = require("express");
const router = express.Router();
const passport = require("passport");

//Import controllers
const {
  addSectionMainPage,
  getSectionsMainPage,
  deleteSectionMainPage,
  updateSectionMainPage,
  uploadMainPageImg,
} = require("../controllers/sectionsMainPage");

// @route   POST /sections-main
// @desc    Create new section on page
// @access  Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  addSectionMainPage
);

// @route   POST /work-stages
// @desc    Upload img to Amazon S3 and update url in DB
// @access  Private
router.post(
  "/upload/:id",
  passport.authenticate("jwt", { session: false }),
  uploadMainPageImg
);

// @route   GET /sections-main
// @desc    GET existing sections
// @access  Public
router.get("/", getSectionsMainPage);

// @route   DELETE /sections-main
// @desc    Delete one section from collection
// @access  Private
router.delete(
  "/:id",
  // passport.authenticate("jwt", { session: false }),
  deleteSectionMainPage
);

// @route   PUT /sections-main
// @desc    Update a section in collection
// @access  Private

router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  updateSectionMainPage
);

module.exports = router;
