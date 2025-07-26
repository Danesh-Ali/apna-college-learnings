const mongoose = require("mongoose")


const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        maxLength: 20
    },
    author: {
        type: String,
    },
    category: {
        type: String,
        enum: ["Fiction", "Non-Fiction"]
    },
    price: {
        type: Number,
        minLength: [1, "Price Should be Greator than 1"]
    }

}, { timestamps: true })

const Book = mongoose.model("Book", bookSchema)

module.exports = Book