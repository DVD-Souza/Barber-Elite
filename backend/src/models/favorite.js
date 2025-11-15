const mongoose = require("mongoose");

const FavoriteSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  service: { type: mongoose.Schema.Types.ObjectId, ref: "Service" }
});

module.exports = mongoose.model("Favorite", FavoriteSchema);
