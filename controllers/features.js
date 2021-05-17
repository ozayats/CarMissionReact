const Feature = require("../models/Feature");
const queryCreator = require("../commonHelpers/queryCreator");
const _ = require("lodash");
const {
  updateS3Credentials,
  upload,
} = require("../commonHelpers/amazon-s3-upload");
const uploadS3 = upload("about-us");

exports.addFeature = (req, res, next) => {
  const newFeature = new Feature(req.body);

  newFeature
    .save()
    .then((data) => res.json(data))
    .catch((err) =>
      res.status(400).json({
        message: `Error happened on server: "${err}" `,
      })
    );
};

exports.getFeatures = (req, res, next) => {
  Feature.find()
    .then((data) => res.send(data))
    .catch((err) =>
      res.status(400).json({
        message: `Error happened on server: "${err}" `,
      })
    );
};

exports.updateFeature = (req, res, next) => {
  Feature.findOne({ _id: req.params.id })
    .then((feature) => {
      if (!feature) {
        return res.status(400).json({
          message: `Feature with _id "${req.params.id}" is not found.`,
        });
      } else {
        const featureData = _.cloneDeep(req.body);
        const updatedFeature = queryCreator(featureData);

        Feature.findOneAndUpdate(
          { _id: req.params.id },
          { $set: updatedFeature },
          { new: true }
        )
          .then((feature) => res.json(feature))
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

exports.deleteFeature = (req, res, next) => {
  Feature.findOne({ _id: req.params.id }).then(async (feature) => {
    if (!feature) {
      return res.status(400).json({
        message: `Feature with id "${req.params.id}" is not found.`,
      });
    } else {
      const featureToDelete = await Feature.findOne({
        _id: req.params.id,
      });

      Feature.deleteOne({ _id: req.params.id })
        .then((deletedCount) =>
          res.status(200).json({
            message: `Feature with id "${featureToDelete._id}" is successfully deletes from DB.`,
            deletedFeatureInfo: featureToDelete,
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

exports.uploadFeatureImg = async (req, res, next) => {
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

        Feature.findOne({ _id: id }).then(async (stage) => {
          if (!stage) {
            return res.status(400).json({
              message: `Feature with id "${id}" is not found.`,
            });
          } else {
            Feature.findOneAndUpdate(
              { _id: id },
              { $set: { imgPath: imageLocation } },
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
