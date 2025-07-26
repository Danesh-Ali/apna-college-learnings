const express = require("express")
const router = express.Router({mergeParams: true}) // to merge url :id like this
const wrapAsync = require("../utils/wrapAsync.js")
const { reviewSchema } = require("../schema.js")
const Listing = require("../models/listing.js")
const Review = require("../models/review.js")
const ExpressError = require("../utils/expressError.js")

const validateReview = (req, res, next) => {
    let { error } = reviewSchema.validate(req.body)

    if (error) {
        console.log(error.details);
        let errMsg = error?.details?.map(element => element.message).join(", ") || "Invalid input";
        throw new ExpressError(400, errMsg)
    } else {
        next()
    }
}


router.post("/", validateReview, wrapAsync(async (req, res) => {
   

    const listing = await Listing.findById(req.params.id)
    const newReview = new Review(req.body.review)

    listing.review.push(newReview)

    await newReview.save()
    await listing.save()
    console.log("Review was created")
 req.flash("success", "New Review has been created Succesfully!")
    res.redirect(`/listings/${listing._id}`)

}))

router.delete("/:reviewId", wrapAsync(async (req, res) => {
    const {id, reviewId} = req.params
   await Listing.findByIdAndUpdate(id, {$pull : {review: reviewId}})
   const deleteReview =   await Review.findByIdAndDelete(reviewId)
    console.log(reviewId, deleteReview);
 req.flash("success", "Review has been deleted Succesfully!")
    res.redirect(`/listings/${id}`)

}))


module.exports = router