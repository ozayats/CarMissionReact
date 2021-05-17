const Blog = require("../models/Blog");
const queryCreator = require("../commonHelpers/queryCreator");
const _ = require("lodash");
const {
  updateS3Credentials,
  upload,
} = require("../commonHelpers/amazon-s3-upload");
const uploadS3 = upload("blogs");

exports.addBlog = (req, res, next) => {
  const newBlog = new Blog(req.body);

  newBlog
    .save()
    .then((data) => res.json(data))
    .catch((err) =>
      res.status(400).json({
        message: `Error happened on server: "${err}" `,
      })
    );
};

exports.getBlogs = (req, res, next) => {
  Blog.find()
    .then((data) => res.send(data))
    .catch((err) =>
      res.status(400).json({
        message: `Error happened on server: "${err}" `,
      })
    );
};
exports.updateBlog = (req, res, next) => {
  Blog.findOne({ _id: req.params.id })
    .then((blog) => {
      if (!blog) {
        return res.status(400).json({
          message: `Blog with _id "${req.params.id}" is not found.`,
        });
      } else {
        const blogData = _.cloneDeep(req.body);
        const updatedBlog = queryCreator(blogData);

        Blog.findOneAndUpdate(
          { _id: req.params.id },
          { $set: updatedBlog },
          { new: true }
        )
          .then((blog) => res.json(blog))
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

exports.deleteBlog = (req, res, next) => {
  Blog.findOne({ _id: req.params.id }).then(async (blog) => {
    if (!blog) {
      return res
        .status(400)
        .json({ message: `Blog with _id "${req.params.id}" is not found.` });
    } else {
      const blogToDelete = await Blog.findOne({ _id: req.params.id });

      Blog.deleteOne({ _id: req.params.id })
        .then((deletedCount) =>
          res.status(200).json({
            message: `Blog with _id "${blogToDelete.id}" is successfully deletes from DB `,
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

exports.uploadBlogImg = async (req, res, next) => {
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

        Blog.findOne({ _id: id }).then(async (blog) => {
          if (!blog) {
            return res.status(400).json({
              message: `Blog with id "${id}" is not found.`,
            });
          } else {
            Blog.findOneAndUpdate(
              { _id: id },
              { $set: { photo: imageLocation } },
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
