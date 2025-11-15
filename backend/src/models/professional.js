const mongoose = require("mongoose");

const ProfessionalSchema = new mongoose.Schema({
  name: String,
  active: { type: Boolean, default: true }
});

module.exports = mongoose.model("Professional", ProfessionalSchema);
