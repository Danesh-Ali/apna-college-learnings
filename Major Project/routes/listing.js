const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/expressError.js");
const Listing = require("../models/listing.js");
const { listingSchema } = require("../schema.js");
const { isLoggedIn } = require("../utils/middleware.js");

// middleware for validate all asyc db functions
const validateListing = (req, res, next) => {
  let { error } = listingSchema.validate(req.body);

  if (error) {
    console.log(error.details);
    let errMsg =
      error?.details?.map((element) => element.message).join(", ") ||
      "Invalid input";
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
};

// #################################################

//  show all title data route
router.get(
  "/",
  wrapAsync(async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });
  })
);

// create new form route
router.get("/new", isLoggedIn, (req, res) => {
  res.render("listings/new.ejs");
});

//Create Route to add new
router.post(
  "/",
  isLoggedIn,
  validateListing,
  wrapAsync(async (req, res, next) => {
    // method 1 destructuring id, tile, etc from req.body
    // -------------------------------------------------------------
    // this is method 2

    const getNewListings = new Listing(req.body.listing);
    await getNewListings.save();
    console.log("new added: ", getNewListings);
    req.flash("success", "New listings has been created Succesfully!");
    res.redirect("/listings");
  })
);

// then show indvidual data

router.get(
  "/:id",
  isLoggedIn,
  wrapAsync(async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id).populate("review");
    if (!listing) {
      req.flash("error", "Listing you requested does not exist!");
      return res.redirect("/listings");
    }
    res.render("listings/show.ejs", { listing });
  })
);

// STEP 1: edit form route with values
router.get(
  "/:id/edit",
  isLoggedIn,
  wrapAsync(async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing) {
      req.flash("error", "Listing you requested does not exist!");
      return res.redirect("/listings");
    }
    res.render("listings/edit.ejs", { listing });
  })
);

// STEP 2: PUT Request to update edit form data
router.put(
  "/:id",
  isLoggedIn,
  validateListing,
  wrapAsync(async (req, res) => {
    // METHOD: 1
    //  const { id } = req.params
    // const getNewListings = req.body.listing
    // const updateListing = await Listing.findByIdAndUpdate(id, (getNewListings))

    // METHOD: 2
    const { id } = req.params;
    const updatedData = await Listing.findByIdAndUpdate(
      id,
      { ...req.body.listing },
      { new: true }
    ); // one by one all a jay gy yha
    console.log("Updated Data 2:", updatedData);
    req.flash("success", "listing has been Updated Succesfully!");
    res.redirect(`/listings/${id}`);
  })
);

router.delete(
  "/:id",
  isLoggedIn,
  wrapAsync(async (req, res) => {
    const { id } = req.params;
    const deletedData = await Listing.findByIdAndDelete(id); // yha schema middleware work kry ga
    console.log(deletedData);
    req.flash("success", "Listings has been deleted Succesfully!");
    res.redirect("/listings");
  })
);

module.exports = router;
