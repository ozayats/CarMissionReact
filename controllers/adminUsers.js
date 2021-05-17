const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const _ = require("lodash");
const keys = require("../config/keys");
const getConfigs = require("../config/getConfigs");
const passport = require("passport");
const uniqueRandom = require("unique-random");
const rand = uniqueRandom(10000000, 99999999);

// Load Admin model
const Admin = require("../models/AdminUser");

// Load Invite model
const Invite = require("../models/Invite");

// Load validation helper to validate all received fields
const validateRegistrationForm = require("../validation/validationHelper");

// Load helper for creating correct query to save customer to DB
const queryCreator = require("../commonHelpers/queryCreator");

// Controller for creating customer and saving to DB
exports.createAdmin = (req, res, next) => {
  // Clone query object, because validator module mutates req.body, adding other fields to object
  const initialQuery = _.cloneDeep(req.body.user);
  const initialQueryInvite = _.cloneDeep(req.body.invite);
  initialQuery.customerNo = rand();

  // Check Validation
  const { errors, isValid } = validateRegistrationForm(req.body.user);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  Admin.findOne({
    login: req.body.user.login,
  })
    .then((admin) => {
      if (admin) {
        if (admin.login === req.body.user.login) {
          return res
            .status(400)
            .json({ message: `Login ${admin.login} already exists"` });
        }
      }

      // Create query object for qustomer for saving him to DB
      const newAdmin = new Admin(queryCreator(initialQuery));

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newAdmin.password, salt, (err, hash) => {
          if (err) {
            res
              .status(400)
              .json({ message: `Error happened on server: ${err}` });

            return;
          }

          newAdmin.password = hash;
          newAdmin
            .save()
            .then((admin) => {
              Invite.deleteOne({
                uuid: req.body.invite.uuid,
                email: req.body.invite.email,
              })
                .then(() => {
                  res.status(200).json(admin);
                })
                .catch((err) =>
                  res.status(400).json({
                    message: `Error happened on server: "${err}" `,
                  })
                );
            })
            .catch((err) =>
              res.status(400).json({
                message: `Error happened on server: "${err}" `,
              })
            );
        });
      });
    })
    .catch((err) =>
      res.status(400).json({
        message: `Error happened on server: "${err}" `,
      })
    );
};

// Controller for customer login
exports.loginAdmin = async (req, res, next) => {
  const { errors, isValid } = validateRegistrationForm(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const login = req.body.login;
  const password = req.body.password;
  const configs = await getConfigs();

  // Find customer by login
  Admin.findOne({
    login: login,
  })
    .then((admin) => {
      // Check for customer
      if (!admin) {
        errors.loginOrEmail = "Admin not found";
        return res.status(404).json(errors);
      }

      // Check Password
      bcrypt.compare(password, admin.password).then((isMatch) => {
        if (isMatch) {
          // Customer Matched
          const payload = {
            id: admin.id,
            firstName: admin.firstName,
            lastName: admin.lastName,
            isAdmin: admin.isAdmin,
            isOwner: admin.isOwner,
          }; // Create JWT Payload

          // Sign Token
          jwt.sign(
            payload,
            keys.secretOrKey,
            { expiresIn: "7 days" },
            (err, token) => {
              res.json({
                success: true,
                token: "Bearer " + token,
              });
            }
          );
        } else {
          errors.password = "Password incorrect";
          return res.status(400).json(errors);
        }
      });
    })
    .catch((err) =>
      res.status(400).json({
        message: `Error happened on server: "${err}" `,
      })
    );
};

// Controller for getting all admin users
exports.getAdmins = (req, res, next) => {
  Admin.find()
    .lean()
    .then((data) => {
      const newData = data.map((admin) => {
        const { password, ...rest } = admin;
        return rest;
      });

      res.send(newData);
    })
    .catch((err) =>
      res.status(400).json({
        message: `Error happened on server: "${err}" `,
      })
    );
};

// Controller for getting one admin user
exports.getAdminById = (req, res, next) => {
  Admin.findOne({ _id: req.params.id })
    .lean()
    .then((admin) => {
      if (!admin) {
        return res.status(400).json({
          message: `Admin with id "${req.params.id}" is not found.`,
        });
      } else {
        const { password, ...rest } = admin;

        res.status(200).send(rest);
      }
    })
    .catch((err) =>
      res.status(400).json({
        message: `Error happened on server: "${err}" `,
      })
    );
};

exports.deleteAdmin = (req, res, next) => {
  Admin.findOne({ _id: req.params.id }).then(async (admin) => {
    if (!admin) {
      return res.status(400).json({
        message: `Admin with id "${req.params.id}" is not found.`,
      });
    } else {
      const adminToDelete = await Admin.findOne({
        _id: req.params.id,
      });

      Admin.deleteOne({ _id: req.params.id })
        .then((deletedCount) =>
          res.status(200).json({
            message: `Admin with id "${adminToDelete._id}" is successfully deletes from DB.`,
            deletedAdminInfo: adminToDelete,
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

// Controller for editing customer personal info
exports.editAdminInfo = (req, res) => {
  // Clone query object, because validator module mutates req.body, adding other fields to object
  const initialQuery = _.cloneDeep(req.body);

  // Check Validation
  const { errors, isValid } = validateRegistrationForm(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  Admin.findOne({ _id: req.params.id })
    .then((admin) => {
      if (!admin) {
        errors.id = "Customer not found";
        return res.status(404).json(errors);
      }

      const currentLogin = admin.login;
      let newLogin;

      if (req.body.login) {
        newLogin = req.body.login;

        if (currentLogin !== newLogin) {
          Admin.findOne({ login: newLogin }).then((admin) => {
            if (admin) {
              errors.login = `Login ${newLogin} is already exists`;
              res.status(400).json(errors);
              return;
            }
          });
        }
      }

      // Create query object for admin for saving him to DB
      const updatedAdmin = queryCreator(initialQuery);

      Admin.findOneAndUpdate(
        { _id: req.params.id },
        { $set: updatedAdmin },
        { new: true }
      )
        .then((admin) => {
          const { password, ...rest } = admin._doc;
          res.status(200).json(rest);
        })
        .catch((err) =>
          res.status(400).json({
            message: `Error happened on server: "${err}" `,
          })
        );
    })
    .catch((err) =>
      res.status(400).json({
        message: `Error happened on server:"${err}" `,
      })
    );
};

// Controller for editing customer password
exports.updatePassword = (req, res) => {
  // Check Validation
  const { errors, isValid } = validateRegistrationForm(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  // find our user by ID
  Admin.findOne({ _id: req.user.id }, (err, admin) => {
    let oldPassword = req.body.password;

    admin.comparePassword(oldPassword, function (err, isMatch) {
      if (!isMatch) {
        errors.password = "Password does not match";
        res.json(errors);
      } else {
        let newPassword = req.body.newPassword;

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newPassword, salt, (err, hash) => {
            if (err) throw err;
            newPassword = hash;
            Admin.findOneAndUpdate(
              { _id: req.user.id },
              {
                $set: {
                  password: newPassword,
                },
              },
              { new: true }
            )
              .then((admin) => {
                res.status(200).json({
                  message: "Password successfully changed",
                  customer: admin,
                });
              })
              .catch((err) =>
                res.status(400).json({
                  message: `Error happened on server: "${err}" `,
                })
              );
          });
        });
      }
    });
  });
};
