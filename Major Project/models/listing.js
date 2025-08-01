const mongoose = require("mongoose");
const Schema = mongoose.Schema; // bar na likhna pry
const Review = require("./review.js");

const listingSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },

    description: String,

    //  this SET is use for default value if its empty

    image: {
      type: String,
      default:
        "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",

      set: (v) =>
        v === ""
          ? "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          : v,
    },

    price: Number,
    location: String,
    country: String,

    review: [
      {
        type: Schema.Types.ObjectId,
        ref: "Review",
      },
    ],
  },
  { timestamps: true }
);

// Ye MIddleware jab listing delete hogi sath review ko b delete krde ga jo usme hongy
listingSchema.post("findOneAndDelete", async (removeListing) => {
  if (removeListing) {
    await Review.deleteMany({ _id: { $in: removeListing.review } });
  }
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
