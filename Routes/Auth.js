const express = require("express");
const router = express.Router();
const Users = require("../models/Users");
const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const fetchuser = require("../middleware/fetchuser");
require("dotenv").config();

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
      const salt = await bcrypt.genSaltSync(10);
      securePass = await bcrypt.hash(req.body.password, salt);
      const User = await Users.create({
        name: req.body.name,
        email: req.body.email,
        password: securePass,
      });
      const data = {
        user: {
          id: User.id,
        },
      };
      const authtoken = jwt.sign(data, JWT_SECRET);

      res.json({
        User: User,
        authtoken: authtoken,
      });
    } catch (error) {
      res.send("error");
    }
  }
);
// Login
router.post(
  "/login",
  [
    body("email", "not an email").isEmail(),
    body("password").exists().withMessage("Min 5 characters Required"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      let user = await Users.findOne({ email });
      // console.log(user)
      if (!user) {
        return res
          .status(400)
          .json({ error: "Login with correct Credentials " });
      }
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        return res
          .status(400)
          .json({ error: "Login with correct Credentials " });
      }
      console.log(passwordCompare);
      const payload = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(payload, process.env.JWT_ACCESS_CODE);
      res.json(authtoken);
    } catch (error) {
      console.log(error.message);
      return res.status(500).json({ Error: "server error" });
    }
  }
);
router.post("/getuser", fetchuser, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await Users.findById(userId).select("-password");
    res.send(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
