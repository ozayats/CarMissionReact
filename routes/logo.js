const express = require("express");
const router = express.Router();
const passport = require("passport"); // multer for parsing multipart form data (files)

//Import controllers
const {
    // addLogo,
    getLogo,
    // deleteLogo,
    updateLogoData,
    uploadLogoIcon,
} = require("../controllers/logo");

// Роуты Post & Delete сохранены на случай изменения структуры данной коллекции 

// @route   GET /logo
// @desc    GET existing logo data
// @access  Public
router.get("/", getLogo);

// @route   POST /logo
// @desc    Create new logo data
// @access  Private
// router.post(
//     "/", 
    // passport.authenticate("jwt-admin", { session: false }),
    // addLogo
// );

// @route   POST /logo
// @desc    Upload img to Amazon S3 and update url in DB
// @access  Private
router.post(
    "/upload/:id",
    passport.authenticate("jwt", { session: false }),
    uploadLogoIcon
);  

// @route   PUT /logo/:id
// @desc    Update existing logo data
// @access  Private
router.put(
    "/:id",
    passport.authenticate("jwt", { session: false }),
    updateLogoData
);


// @route   DELETE /logo/:id
// @desc    DELETE existing logo data
// @access  Private
// router.delete(
//     "/:id",
//     passport.authenticate("jwt", { session: false }),
//     deleteLogo
// );

module.exports = router;
