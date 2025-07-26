const mongoose = require("mongoose");
const Schema = mongoose.Schema; // bar bar na likhna pry

const reviewSchema = new Schema({
    comment: String,

    rating: {
        type: Number,
        min: 1,
        max: 5
    }

}, { timestamps: true })

module.exports = mongoose.model("Review", reviewSchema)