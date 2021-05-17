const express = require("express");
const router = express.Router();
const passport = require("passport");

//Import controllers
const {
    addNavbarItem,
    getNavbarItems,
    deleteNavbarItem,
    updateNavbarItem
} = require("../controllers/navbar");

// @route   GET /navbar
// @desc    GET existing navbar items
// @access  Public
router.get("/", getNavbarItems);

// @route   POST /navbar
// @desc    Create new navbar item
// @access  Private
router.post(
    "/", 
    passport.authenticate("jwt", { session: false }),
    addNavbarItem
);

// @route   PUT /navbar/:id
// @desc    Update existing navbar item
// @access  Private
router.put(
    "/:id",
    passport.authenticate("jwt", { session: false }),
    updateNavbarItem
);

// @route   DELETE /navbar/:id
// @desc    DELETE existing navbar item
// @access  Private
router.delete(
    "/delete/:id",
    passport.authenticate("jwt", { session: false }),
    deleteNavbarItem
);

module.exports = router;
