const express = require("express");
const auth = require("../middlewares/auth");
const Booking = require("../models/booking");
const Service = require("../models/service");

const router = express.Router();

router.post("/", auth, async (req, res) => {
  const { serviceId, professionalId, startAt } = req.body;

  const service = await Service.findById(serviceId);
  const start = new Date(startAt);
  const end = new Date(start.getTime() + service.duration * 60000);

  const booking = await Booking.create({
    user: req.user._id,
    service: serviceId,
    professional: professionalId,
    startAt: start,
    endAt: end,
    price: service.price
  });

  res.json(booking);
});

module.exports = router;
