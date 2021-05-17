const aws = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");
const getConfigs = require("../config/getConfigs");

exports.updateS3Credentials = async () => {
  const credentials = await getConfigs("aws-credentials");
  const cred = JSON.parse(JSON.stringify(credentials));

  aws.config.update({
    secretAccessKey: cred.aws_secret_access_key,
    accessKeyId: cred.aws_access_key_id,
    region: cred.region,
  });
};

exports.upload = (folderName) =>
  multer({
    storage: multerS3({
      s3: new aws.S3(),
      bucket: "car-mission",
      metadata: function (req, file, cb) {
        cb(null, { fieldName: file.fieldname });
      },
      key: function (req, file, cb) {
        const newFileName = Date.now().toString() + "-" + file.originalname;
        const fullPath = `${folderName}/${newFileName}`;
        cb(null, fullPath);
      },
    }),
    limits: { fileSize: 10000000 },
  }).single("image");
