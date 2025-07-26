const express = require("express");
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync");
const router = express.Router();
const passport = require("passport");

router.get("/signup", (req, res) => {
  res.render("users/signup.ejs");
});

router.post(
  "/signup",
  wrapAsync(async (req, res) => {
    try {
      const { username, email, password } = req.body;
      const newUser = new User({ username, email });
      const registeredUser = await User.register(newUser, password);
      console.log(registeredUser);

      req.login(registeredUser, (err) => {
        if (err) {
          return next(err);
        }

        req.flash("success", "Welcome to Wonderlust");
        res.redirect("/listings");
      });

    } catch (error) {
      req.flash("error", error.message);
      res.redirect("/signup");
    }
  })
);

router.get("/login", (req, res) => {
  res.render("users/login.ejs");
});

router.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
  }),
  async (req, res) => {
    req.flash("success", "Welcome back to Major Project");
    res.redirect("/listings");
  }
);

router.get("/logout", (req, res) => {
  req.logout((err, next) => {
    if (err) {
      return next();
    }

    req.flash("success", "You are logged out successfully!");
    res.redirect("/listings");
  });
});

module.exports = router;
