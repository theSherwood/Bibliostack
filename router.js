const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const bodyParser = require("body-parser");

// Load Models
require("./models/User");

// Load Routes
const auth = require("./routes/api/auth");
const books = require("./routes/api/books");

// Mongoose Connect
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true
  })
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

const app = express();

// Body-parser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

// Passport Config
require("./config/passport")(passport);

// Use Routes
app.use("/api/auth", auth);
app.use("/api/books", books);

app.get("*", (req, res) => {
  res.json({ success: "connected to router" });
});

module.exports = app;
