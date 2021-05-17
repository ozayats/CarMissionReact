const Logo = require("../models/Logo");
const _ = require("lodash");
const queryCreator = require("../commonHelpers/queryCreator");
const {
  updateS3Credentials,
  upload,
} = require("../commonHelpers/amazon-s3-upload");
const uploadS3 = upload("social-networks");

// Контроллеры Post & Delete сохранены на случай изменения структуры данной коллекции 

// exports.addLogo = (req, res, next) => {
//     const newLogo = new Logo(req.body);

//     newLogo
//         .save()
//         .then(data => res.json(data))
//         .catch(err =>
//             res.status(400).json({
//             message: `Error happened on server: "${err}" `
//         })
//         );

// };

exports.getLogo = (req, res, next) => {
    Logo.find()
        .then(data => res.send(data))
        .catch(err =>
            res.status(400).json({
            message: `Error happened on server: "${err}" `
        })
    );
};

// exports.deleteLogo = (req, res, next) => {
//     Logo.findOne({ _id: req.params.id }).then(async logo => {
//       if (!logo) {
//         return res
//           .status(400)
//           .json({ message: `Logo with _id "${req.params.id}" is not found.` });
//       } else { 
//         Logo.deleteOne({ _id: req.params.id })
//           .then(deletedCount =>
//             res.status(200).json({
//               message: `Logo is successfully deletes from DB. `
//             })
//           )
//           .catch(err =>
//             res.status(400).json({
//               message: `Error happened on server: "${err}" `
//             })
//           );
//       }
//     });
// };

exports.updateLogoData = (req, res, next) => {
    Logo.findOne({ _id: req.params.id })
        .then(logo => {
        if (!logo) {
            return res
            .status(400)
            .json({ message: `Logo is not found.` });
        } else {
            const logoData = _.cloneDeep(req.body);
            const updatedLogoData = queryCreator(logoData);

            Logo.findOneAndUpdate(
            { _id: req.params.id },
            { $set: updatedLogoData },
            { new: true }
            )
            .then(logo => res.json(logo))
            .catch(err =>
                res.status(400).json({
                message: `Error happened on server: "${err}" `
                })
            );
        }
        })
        .catch(err =>
        res.status(400).json({
            message: `Error happened on server: "${err}" `
        })
    );
};

exports.uploadLogoIcon = async (req, res, next) => {
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

        Logo.findOne({ _id: id }).then(async (logo) => {
          if (!logo) {
            return res.status(400).json({
              message: `Incorrect data, please connect with developer for resolve this problem`,
            });
          } else {
            Logo.findOneAndUpdate(
              { _id: id },
              { $set: { iconSrc: imageLocation } },
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

