const ServicePackage = require("../models/ServicePackage");
const queryCreator = require("../commonHelpers/queryCreator");
const _ = require("lodash");

exports.addServicePackage = (req, res, next) => {
  const newServicePackage = new ServicePackage(req.body);

  newServicePackage
    .save()
    .then((data) => res.json(data))
    .catch((err) =>
      res.status(400).json({
        message: `Error happened on server: "${err}"`,
      })
    );
};

exports.getServicePackages = (req, res, next) => {
  ServicePackage.find()
    .then((data) => res.send(data))
    .catch((err) =>
      res.status(400).json({
        message: `Error happened on server: "${err}" `,
      })
    );
};

exports.updateServicePackage = (req, res, next) => {
  ServicePackage.findOne({ _id: req.params.id })
    .then((servicePackage) => {
      if (!servicePackage) {
        return res.status(400).json({
          message: `Feature with _id "${req.params.id}" is not found.`,
        });
      } else {
        const servicePackageData = _.cloneDeep(req.body);
        const updatedServicePackage = queryCreator(servicePackageData);

        ServicePackage.findOneAndUpdate(
          { _id: req.params.id },
          { $set: updatedServicePackage },
          { new: true }
        )
          .then((servicePackage) => res.json(servicePackage))
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

exports.deleteServicePackage = (req, res, next) => {
  ServicePackage.findOne({ _id: req.params.id }).then(
    async (servicePackage) => {
      if (!servicePackage) {
        return res.status(400).json({
          message: `Feature with id "${req.params.id}" is not found.`,
        });
      } else {
        const servicePackageToDelete = await ServicePackage.findOne({
          _id: req.params.id,
        });

        ServicePackage.deleteOne({ _id: req.params.id })
          .then((deletedCount) =>
            res.status(200).json({
              message: `Feature with id "${servicePackageToDelete._id}" is successfully deletes from DB.`,
              deletedFeatureInfo: servicePackageToDelete,
            })
          )
          .catch((err) =>
            res.status(400).json({
              message: `Error happened on server: "${err}" `,
            })
          );
      }
    }
  );
};
