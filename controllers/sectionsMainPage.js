const SectionMainPage = require("../models/SectionMainPage");
const Navbar = require("../models/Navbar");
const _ = require("lodash");
const queryCreator = require("../commonHelpers/queryCreator");
const {
  updateS3Credentials,
  upload,
} = require("../commonHelpers/amazon-s3-upload");
const uploadS3 = upload("main-page-sections");

exports.getSectionsMainPage = (req, res, next) => {
  SectionMainPage.find()
    .then((data) => res.send(data))
    .catch((err) =>
      res.status(400).json({
        message: `Error happened on server: "${err}" `,
      })
    );
};

exports.addSectionMainPage = (req, res, next) => {
  const newSectionMainPage = new SectionMainPage(req.body);

  newSectionMainPage
    .save()
    .then((data) => res.json(data))
    .catch((err) =>
      res.status(400).json({
        message: `Error happened on server: "${err}" `,
      })
    );
};

exports.updateSectionMainPage = (req, res, next) => {
  SectionMainPage.findOne({ _id: req.params.id })
    .then((sectionMainPage) => {
      if (!sectionMainPage) {
        return res.status(400).json({
          message: `Section of main page with _id "${req.params.id}" is not found.`,
        });
      } else {
        const { old, ...rest } = req.body;
        const sectionMainPageData = _.cloneDeep(rest);
        const updatedSectionMainPage = queryCreator(sectionMainPageData);
        console.log("new", rest.name);
        console.log("old", old);
        SectionMainPage.findOneAndUpdate(
          { _id: req.params.id },
          { $set: updatedSectionMainPage },
          { new: true }
        )
          .then((sectionMainPage) => {
            Navbar.findOneAndUpdate(
              { sectionId: old },
              { $set: { sectionId: rest.name } },
              { new: true }
            )
              .then((nav) => {
                res.json(sectionMainPage);
              })
              .catch((err) => {
                res
                  .status(400)
                  .json({ message: `Err happened on server: ${err}` });
              });
          })
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

exports.deleteSectionMainPage = (req, res, next) => {
  SectionMainPage.deleteOne({ _id: req.params.id })
    .then(() => {
      res.status(200).json({
        message: "you've just deleted section from sections collection",
      });
    })
    .catch((err) => {
      res.status(400).json({
        message: `Error happened on server: "${err}" `,
      });
    });
};

exports.deleteAllSectionsMainPage = (req, res, next) => {
  SectionMainPage.deleteMany({})
    .then(() => {
      res.status(200).json({
        message: "you've just deleted all data from collection",
      });
    })
    .catch((err) => {
      res.status(400).json({
        message: `Error happened on server: "${err}"`,
      });
    });
};

exports.uploadMainPageImg = async (req, res, next) => {
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

        SectionMainPage.findOne({ _id: id }).then(async (stage) => {
          if (!stage) {
            return res.status(400).json({
              message: `Stage with id "${id}" is not found.`,
            });
          } else {
            SectionMainPage.findOneAndUpdate(
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
