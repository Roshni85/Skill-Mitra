const mongoose = require("mongoose");
require("../config/db");
const skillSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Course Name
  description: { type: String, required: true }, // Course Description
  created_at: { type: Date, default: Date.now }, // Timestamp
  videos:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Video"
}]
});

const Skill = mongoose.model("Skill", skillSchema);

module.exports = Skill;