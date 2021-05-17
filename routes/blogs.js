const express = require("express");
const router = express.Router();
const passport = require("passport");

//Import controllers
const {
  addBlog,
  getBlogs,
  updateBlog,
  deleteBlog,
  uploadBlogImg,
} = require("../controllers/blogs");

// @route   POST /catalog
// @desc    Create new category
// @access  Private
router.post("/", passport.authenticate("jwt", { session: false }), addBlog);

router.post(
  "/upload/:id",
  passport.authenticate("jwt", { session: false }),
  uploadBlogImg
);

// @route   GET /catalog
// @desc    GET existing categories
// @access  Public
router.get("/", getBlogs);
// @route   PUT api/features/:id
// @desc    Update existing comment
// @access  Private

router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  updateBlog
);

// @route   DELETE api/features/:id
// @desc    Delete existing comment
// @access  Private
router.delete(
  "/delete/:id",
  passport.authenticate("jwt", { session: false }),
  deleteBlog
);

module.exports = router;
