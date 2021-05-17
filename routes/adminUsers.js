const express = require("express");
const router = express.Router();
const passport = require("passport");

//Import controllers
const {
  createAdmin,
  loginAdmin,
  getAdmins,
  getAdminById,
  deleteAdmin,
  editAdminInfo,
  updatePassword,
} = require("../controllers/adminUsers");

// @route   POST /admin-users
// @desc    Register admin
// @access  Private
router.post("/", createAdmin);

// @route   POST /admin-users/login
// @desc    Login Admin / Returning JWT Token
// @access  Public
router.post("/login", loginAdmin);

// @route   GET /admin-users
// @desc    Return admins collection
// @access  Private
router.get("/", passport.authenticate("jwt", { session: false }), getAdmins);

// @route   GET /admin-users
// @desc    Return one admin
// @access  Private
router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  getAdminById
);

// @route   DELETE /admin-users/delete/
// @desc    Delete admin by id
// @access  Private
router.delete(
  "/delete/:id",
  passport.authenticate("jwt", { session: false }),
  deleteAdmin
);

// @route   PUT /admin-users
// @desc    Return current customer
// @access  Private
router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  editAdminInfo
);

// @route   POST /admin-users/update-password
// @desc    Return current customer and success or error message
// @access  Private
router.put(
  "/password/:id",
  passport.authenticate("jwt", { session: false }),
  updatePassword
);

module.exports = router;
