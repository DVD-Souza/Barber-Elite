const express = require("express");
const Professional = require("../models/professional");

const router = express.Router();

router.get("/", async (req, res) => {
  res.json(await Professional.find());
});

module.exports = router;
