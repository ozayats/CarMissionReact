const Navbar = require("../models/Navbar");
const _ = require("lodash");
const queryCreator = require("../commonHelpers/queryCreator");

exports.addNavbarItem = (req, res, next) => {
    const newNavbar = new Navbar(req.body);

    newNavbar
        .save()
        .then(data => res.json(data))
        .catch(err =>
            res.status(400).json({
            message: `Error happened on server: "${err}" `
        })
        );

};

exports.getNavbarItems = (req, res, next) => {
    Navbar.find()
        .then(data => res.send(data))
        .catch(err =>
            res.status(400).json({
            message: `Error happened on server: "${err}" `
        })
    );
};

exports.updateNavbarItem = (req, res, next) => {
  Navbar.findOne({ _id: req.params.id })
    .then(navbarItem => {
      if (!navbarItem) {
        return res
          .status(400)
          .json({ message: `Navbar item with _id "${req.params.id}" is not found.` });
      } else {
        const navbarData = _.cloneDeep(req.body);
        const updatedNavbarItem = queryCreator(navbarData);

        Navbar.findOneAndUpdate(
          { _id: req.params.id },
          { $set: updatedNavbarItem },
          { new: true }
        )
          .then(navbarItem => res.json(navbarItem))
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


exports.deleteNavbarItem = (req, res, next) => {
    Navbar.findOne({ _id: req.params.id }).then(async item => {
      if (!item) {
        return res
          .status(400)
          .json({ message: `Item with _id "${req.params.id}" is not found.` });
      } else {
        const itemToDelete = await Navbar.findOne({ _id: req.params.id });
  
        Navbar.deleteOne({ _id: req.params.id })
          .then(deletedCount =>
            res.status(200).json({
              message: `Item witn textContent "${itemToDelete.textContent}" is successfully deletes from DB `
            })
          )
          .catch(err =>
            res.status(400).json({
              message: `Error happened on server: "${err}" `
            })
          );
      }
    });
  };
  
  


