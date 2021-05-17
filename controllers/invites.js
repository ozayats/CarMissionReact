const Invite = require("../models/Invite");
const { v4: uuidv4 } = require("uuid");
const queryCreator = require("../commonHelpers/queryCreator");
const _ = require("lodash");
const mailSender = require("../commonHelpers/mailSender");
const subject = "Приглашение на регистрацию на сайте Car Mission";

exports.addInvite = async (req, res, next) => {
  const { email } = req.body;
  const newUuid = uuidv4();
  const hostUrl = req.protocol + "://" + req.get("host");
  const newInvite = new Invite({ uuid: newUuid, email });
  const newMail = await mailSender(
    email,
    subject,
    `<p style="font-size: 20px">Ваша ссылка на регистрацию на сайте:<br>${hostUrl}/users/registration/invite?uuid=${newUuid}&email=${email}</p>`
  ).catch((err) => {
    res.status(400).json({ message: `Error happened on server: "${err}" ` });
  });

  Invite.findOne({ email: req.body.email })
    .then((invite) => {
      if (invite) {
        res
          .status(400)
          .json({ message: `invite on email ${req.body.email} already exist` });
      } else {
        newInvite
          .save()
          .then((data) => res.status(200).json({ message: "Invite sent" }))
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

exports.validateInvite = (req, res, next) => {
  const { uuid, email } = req.body;
  Invite.findOne({ uuid, email })
    .then((invite) => {
      if (!invite) {
        res.status(400).json({
          message: "Error! There is no such invite",
        });
      } else {
        res.status(200).json({ message: "Invite confirmed" });
      }
    })
    .catch((err) =>
      res.status(400).json({
        message: `Error happened on server: "${err}" `,
      })
    );
};
