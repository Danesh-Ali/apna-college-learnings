const mongoose = require("mongoose")
const Book = require("./models/book.js")

connectDatabase().then(() => {
    console.log("DB Connection Succesfully Connected");
}).catch((err) => {
    console.log(err);
})


async function connectDatabase() {
    await mongoose.connect("mongodb://127.0.0.1:27017/practice")
}


const bookData = [
    {
        title: "English",
        author: "einstine",
        category: "Fiction",
        price: 1200
    },
    {
        title: "Urdu",
        author: "einstine urdu",
        category: "Non-Fiction",
        price: 1100
    },
    {
        title: "Math",
        author: "einstine math",
        category: "Fiction",
        price: 1000
    }
]

Book.insertMany(bookData)




