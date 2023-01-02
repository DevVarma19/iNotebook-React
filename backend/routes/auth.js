const express = require("express");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const JWT_SECRET = "Harryisagoodb$boy";

const User = require("../models/User");
const fetchUser = require("../middleware/fetchuser");

const router = express.Router();

// ROUTE 1 : Create a User using: POST "/api/auth". No login required
router.post(
  "/createuser",
  [
    body("name", "Enter valid Name").isLength({ min: 3 }),
    body("email", "Enter valid Email").isEmail(),
    body("password", "Password must be atleast 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    // If there are errors -> Return bad request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).json({ error: "User already exists" });
      }

      // Hashing the password
      req.body.password = await bcrypt.hash(req.body.password, 10);

      // Create new User
      user = await User.create(req.body).then((user) => {
        const payLoad = {
          user: {
            id: user.id,
          },
        };
        const authToken = jwt.sign(payLoad, JWT_SECRET);
        res
          .status(201)
          .json({ authtoken: authToken, message: "User added successfully" });
      });
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

// ROUTE 2 : Authenticate a User using : POST "/api/auth/login". No login required
router.post(
  "/login",
  [
    body("email", "Enter valid Email").isEmail(),
    body("password", "Password must be atleast 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    // If there are errors -> Return bad request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ error: "User doesn't exist!" });
      }

      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        return res.status(400).json({ error: "Invalid credentails!" });
      }

      const payLoad = {
        user: {
          id: user.id,
        },
      };
      // Generating authToken
      const authToken = jwt.sign(payLoad, JWT_SECRET);
      res
        .status(201)
        .json({
          authtoken: authToken,
          message: "User logged in successfully!",
        });
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

// ROUTE 3 : Get loggedin User Details using: POST "/api/auth/getuser". Login required
router.post("/getuser", fetchUser, async (req, res) => {
  try {
    userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
