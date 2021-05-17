const Review = require("../models/Review");
const queryCreator = require("../commonHelpers/queryCreator");
const _ = require("lodash");
const {
  updateS3Credentials,
  upload,
} = require("../commonHelpers/amazon-s3-upload");
const uploadS3 = upload("reviews");

exports.addReview = (req, res, next) => {
  const newReview = new Review(req.body);

  newReview
    .save()
    .then((data) => res.json(data))
    .catch((err) =>
      res.status(400).json({
        message: `Error happened on server: "${err}" `,
      })
    );
};

exports.getReviews = (req, res, next) => {
  Review.find()
    .then((data) => res.send(data))
    .catch((err) =>
      res.status(400).json({
        message: `Error happened on server: "${err}" `,
      })
    );
};
exports.updateReview = (req, res, next) => {
  Review.findOne({ _id: req.params.id })
    .then((review) => {
      if (!review) {
        return res.status(400).json({
          message: `Review with _id "${req.params.id}" is not found.`,
        });
      } else {
        const reviewData = _.cloneDeep(req.body);
        const updatedReview = queryCreator(reviewData);

        Review.findOneAndUpdate(
          { _id: req.params.id },
          { $set: updatedReview },
          { new: true }
        )
          .then((review) => res.json(review))
          .catch((err) =>
            res.status(400).json({
              message: `Error happened on server: "${err}" `,
            })
          );
      }
    })
    .catch((err) =>
      res.status(400).json({
        message: `Error happened on server: "${err}" `,
      })
    );
};

exports.deleteReview = (req, res, next) => {
  Review.findOne({ _id: req.params.id }).then(async (review) => {
    if (!review) {
      return res
        .status(400)
        .json({ message: `Review with _id "${req.params.id}" is not found.` });
    } else {
      const reviewToDelete = await Review.findOne({ _id: req.params.id });

      Review.deleteOne({ _id: req.params.id })
        .then((deletedCount) =>
          res.status(200).json({
            message: `Review with _id "${reviewToDelete.id}" is successfully deletes from DB `,
          })
        )
        .catch((err) =>
          res.status(400).json({
            message: `Error happened on server: "${err}" `,
          })
        );
    }
  });
};

exports.uploadReviewImg = async (req, res, next) => {
  await updateS3Credentials();

  const { id } = req.params;
  uploadS3(req, res, (error) => {
    if (error) {
      res.status(400).json({
        message: `Error happened on server: "${error}" `,
      });
    } else {
      // If File not found
      if (!req.file) {
        res.status(400).json({ message: "No File Selected" });
      } else {
        // If Success
        const imageName = req.file.key;
        const imageLocation = req.file.location;

        Review.findOne({ _id: id }).then(async (review) => {
          if (!review) {
            return res.status(400).json({
              message: `Review with id "${id}" is not found.`,
            });
          } else {
            Review.findOneAndUpdate(
              { _id: id },
              { $set: { customerPhoto: imageLocation } },
              { new: true }
            )
              .then(() =>
                res.json({
                  image: imageName,
                  location: imageLocation,
                })
              )
              .catch((err) =>
                res.status(400).json({
                  message: `Error happened on server: "${err}" `,
                })
              );
          }
        });
      }
    }
  });
};
