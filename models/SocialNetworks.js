const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SocialNetworksSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        isEnabled: {
            type: Boolean,
            required: true,
            default: true,
        },
        url: {
            type: String,
            required: true
        },
        iconSrc: {
            type: String,
        },

    }
);

module.exports = SocialNetworks = mongoose.model("SocialNetworks", SocialNetworksSchema);