const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  service: { type: mongoose.Schema.Types.ObjectId, ref: "Service" },
  professional: { type: mongoose.Schema.Types.ObjectId, ref: "Professional" },
  startAt: Date,
  endAt: Date,
  price: Number,
  status: {
    type: String,
    default: "Confirmado"
  }
});

module.exports = mongoose.model("Booking", BookingSchema);
