const express = require("express");
const router = express.Router();
const Users = require("../models/Users");
const { body, validationResult } = require("express-validator");

router.post(
  "/createuser",


  async (req, res) => {
    console.log(req.body.name)
  }
);

module.exports = router;
