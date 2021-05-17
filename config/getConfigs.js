const GlobalConfig = require("../models/GlobalConfig");

module.exports = async (customId) => {
  const configs = await GlobalConfig.findOne({
    customId: customId,
  });
  return configs;
};
