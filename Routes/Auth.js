const express = require("express");
const router = express.Router();
const Users = require("../models/Users");
const { body, validationResult } = require("express-validator");

router.post(
  "/createuser",
  [
    body("name").isLength({ min: 1 }).withMessage("Name is required"),
    body("email").isEmail().withMessage("Email is required"),
    body("password").isLength({ min: 5 }).withMessage("Password is required"),
  ],

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      console.log(req.body);
    } catch (error) {
      res.send("error");
    }
  }
);

module.exports = router;
