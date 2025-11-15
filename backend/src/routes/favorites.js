const express = require("express");
const auth = require("../middlewares/auth");
const Favorite = require("../models/favorite");

const router = express.Router();

router.post("/", auth, async (req, res) => {
  const { serviceId } = req.body;

  res.json(await Favorite.create({
    user: req.user._id,
    service: serviceId
  }));
});

module.exports = router;
