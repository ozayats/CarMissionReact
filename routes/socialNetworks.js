const express = require("express");
const router = express.Router();
const passport = require("passport"); // multer for parsing multipart form data (files)

//Import controllers
const {
    addSocialNetworksData,
    getSocialNetworksData,
    getSocialNetworksItem,
    updateSocialNetworksItem,
    deleteSocialNetworksItem,
    uploadSocialNetworksIcon,
} = require("../controllers/socialNetworks");

// @route   GET /social-networks
// @desc    GET existing social-networks data
// @access  Public
router.get("/", getSocialNetworksData);

// @route   GET /social-networks/:id
// @desc    GET item by id
// @access  Public
router.get("/:id", getSocialNetworksItem);

// @route   POST /social-networks
// @desc    Create new social-networks item
// @access  Private
router.post(
    "/", 
    passport.authenticate("jwt", { session: false }),
    addSocialNetworksData
);

// @route   POST /social-networks
// @desc    Upload img to Amazon S3 and update url in DB
// @access  Private
router.post(
    "/upload/:id",
    passport.authenticate("jwt", { session: false }),
    uploadSocialNetworksIcon
);

// @route   PUT /social-networks/:id
// @desc    Update existing social network info
// @access  Private
router.put(
    "/:id",
    passport.authenticate("jwt", { session: false }),
    updateSocialNetworksItem
);

// @route   DELETE /social-networks/:id
// @desc    DELETE existing social network item
// @access  Private
router.delete(
    "/delete/:id",
    passport.authenticate("jwt", { session: false }),
    deleteSocialNetworksItem
);



module.exports = router;
