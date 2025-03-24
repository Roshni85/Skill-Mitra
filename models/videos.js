const mongoose = require("mongoose");
require("../config/db");

const videoSchema = new mongoose.Schema({
    title: { type: String, required: true },
      url: { type: String, required: true },
      description: { type: String },
    });

const Video = mongoose.model("Video", videoSchema);
module.exports = Video;