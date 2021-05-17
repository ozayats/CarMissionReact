const axios = require("axios");

const newConfigs = {
  "customId": "carsmission-global-configs",
  "development": {
    "database": {
      "uri": "mongodb+srv://carsmission:CarsMission2020@cars-mission-db.fsih5.mongodb.net/cars-mission-db?retryWrites=true&w=majority"
    },
    "email": {
      "mailUser": "db.carsmission@gmail.com",
      "mailPassword": "CarsMission07022020",
      "mailService": "gmail"
    },
  },
  "production": {
    "database": {
      "uri": "mongodb+srv://carsmission:CarsMission2020@cars-mission-db.fsih5.mongodb.net/cars-mission-db?retryWrites=true&w=majority"
    },
    "email": {
      "mailUser": "db.carsmission@gmail.com",
      "mailPassword": "CarsMission07022020",
      "mailService": "gmail"
    },
  }
};
axios
  .post("/api/configs", newConfigs)
  .then(newConfigs => {
    console.log(newConfigs)
  })
  .catch(err => {
    console.log(err)
  });