const express = require("express");
const app = express();
const PORT = 5000;
const session = require("express-session");
const flash = require("connect-flash");
const path = require("path");
// session ka kam hota 1 single information ko store krwana ta k usko ham different different pages pr show krwa sky

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

const sessionOptions = {
  secret: "SuperSecretCode",
  resave: false,
  saveUninitialized: true,
};

app.use(session(sessionOptions));
app.use(flash());

app.use((req, res, next) => {
  res.locals.successMsg = req.flash("success"); // access with key only
  res.locals.errorMsg = req.flash("error");
  next();
});

app.get("/register", (req, res) => {
  let { name = "anonymous" } = req.query;
  req.session.name = name;
  if (name === "anonymous") {
    req.flash("error", "user not registered");
  } else {
    req.flash("success", "user registered successfully");
  }

  res.redirect("/hello");
});

app.get("/hello", (req, res) => {
  //   res.locals.successMsg = req.flash("success"); // access with key only
  //   res.locals.errorMsg = req.flash("error");
  //   res.render("page.ejs", { name: req.session.name, msg: req.flash("success") });
  res.render("page.ejs", { name: req.session.name });
});

app.listen(PORT, (req, res) => {
  console.log("Server working on", PORT);
});
