const express = require("express");
const router = express.Router();
const passport = require("passport");

//Import controllers
const {
  addServicePackage,
  getServicePackages,
  updateServicePackage,
  deleteServicePackage,
} = require("../controllers/servicePackages");

// @route   POST /catalog
// @desc    Create new category
// @access  Private
router.post("/", addServicePackage);

// @route   PUT /service-packages
// @desc    Update stage from collection by id
// @access  Private
router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  updateServicePackage
);

// @route   DELETE /service-packages
// @desc    Delete stage from collection by id
// @access  Private
router.delete(
  "/delete/:id",
  passport.authenticate("jwt", { session: false }),
  deleteServicePackage
);

// @route   GET /catalog
// @desc    GET existing categories
// @access  Public
router.get("/", getServicePackages);

module.exports = router;