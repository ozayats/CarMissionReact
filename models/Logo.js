const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LogoSchema = new Schema(
    {
        iconSrc: {
            type: String,
            required: true
        },
        id: {
            type: String,
        },
        alt: {
            type: String,
        }
    }
);

module.exports = Logo = mongoose.model("Logo", LogoSchema);