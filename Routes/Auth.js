const express = require("express");
const router = express.Router();
const Users = require("../models/Users");
const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken")
require('dotenv').config()


router.post(
  "/createuser",
  [
    body("name").isLength({ min: 3 }).withMessage("Min 3 characters Required"),
    body("email").isEmail().withMessage("Email Required"),
    body("password")
      .isLength({ min: 5 })
      .withMessage("Min 5 characters Required"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      let useremail = await Users.findOne({ email: req.body.email });
      if (useremail) {
        return res
          .status(400)
          .json({ errors: [{ msg: "User already exists" }] });
      }
      const User = await Users.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      });
      const data = {
        id : User.id
      }
      const authtoken = jwt.sign(data, process.env.JWT_ACCESS_CODE)
      
      res.json({
        User: User,
        authtoken : authtoken,
      });
    } catch (error) {
      res.send("error");
    }
  }
);

module.exports = router;
