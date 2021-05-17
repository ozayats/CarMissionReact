const Feedback = require("../models/Feedback");
const mailSender = require("../commonHelpers/mailSender");

exports.createFeedback = (req, res, next) => {
  mailSender(
    "db.carsmission@gmail.com",
    "Вам пришел запрос от клиента",
    `<p style="font-size: 20px">Вам пришел запрос от клиента: имя клиента ${req.body.name}, контактный номер телефона ${req.body.phone}.</p>`
  );

  const newFeedback = new Feedback(req.body);

  newFeedback
    .save()
    .then((data) => res.json(data))
    .catch((err) =>
      res.status(400).json({
        message: `Error happened on server: "${err}" `,
      })
    );
};

exports.getFeedbacks = (req, res, next) => {
  Feedback.find()
    .then((data) => res.send(data))
    .catch((err) =>
      res.status(400).json({
        message: `Error happened on server: "${err}" `,
      })
    );
};

exports.deleteFeedback = (req, res, next) => {
  Feedback.findOne({ _id: req.params.id }).then(async (feedback) => {
    if (!feedback) {
      return res.status(400).json({
        message: `Feedback with id "${req.params.id}" is not found.`,
      });
    } else {
      const feedbackToDelete = await Feedback.findOne({
        _id: req.params.id,
      });

      Feedback.deleteOne({ _id: req.params.id })
        .then((deletedCount) =>
          res.status(200).json({
            message: `Feedback with id "${feedbackToDelete._id}" is successfully deletes from DB.`,
            deletedFeatureInfo: feedbackToDelete,
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
