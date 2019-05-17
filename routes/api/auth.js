const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Load Validation
const validateSignUpInput = require("../../validation/signup");
const validateSignInInput = require("../../validation/signin");

// Load User Model
const User = require("../../models/User");

// @route     POST /api/auth/signin
// @desc      Sign in for email and password
// @access    Public
router.post("/signin", (req, res) => {
  const { errors, isValid } = validateSignInInput(req.body);

  // Check String Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  // Find user
  User.findOne({ email }).then(user => {
    if (!user) {
      errors.email = "That email doesn't match our records";
      return res.status(404).json(errors);
    }
    // Check password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // Create JWT payload
        const payload = {
          id: user.id,
          email: user.email,
          handle: user.handle
        };

        jwt.sign(
          payload,
          process.env.JWT_SECRET,
          { expiresIn: 36000 },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token
            });
          }
        );
      } else {
        errors.password = "That password doesn't match our records";
        return res.status(404).json(errors);
      }
    });
  });
});

// @route     POST /api/auth/signup
// @desc      Sign up with email and password
// @access    Public
router.post("/signup", (req, res) => {
  console.log(req.body);
  const { errors, isValid } = validateSignUpInput(req.body);

  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      errors.email = "That email is already registered";
      return res.status(400).json(errors);
    } else {
      // Check String Validation
      if (!isValid) {
        console.log("bad");
        return res.status(400).json(errors);
      }

      const newUser = new User({
        email: req.body.email,
        password: req.body.password
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json("success"))
            .catch(err => console.error(err));
        });
      });
    }
  });
});

module.exports = router;
