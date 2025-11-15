const express = require("express");
const Service = require("../models/service");

const router = express.Router();

router.get("/", async (req, res) => {
  res.json(await Service.find());
});

module.exports = router;
