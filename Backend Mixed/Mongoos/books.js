const mongoose = require("mongoose")

main().then(() => {
    console.log("Connection Sucessfull");
}).catch(err => console.log(err))

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/amazone")
}

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true,
        unique: true, // every unique value accepted
        maxLength: [20, "Length of title is low or exceed max length 20"]
    },
    author: {
        type: String,
    },
    category: {
        type: String,
        enum: ["fiction", "non-fiction"] // select only one option other accept ni hoga

    },

    genre: [String] // to store multi value in one array
})

const Book = mongoose.model("Book", bookSchema)

// Book.insertMany([
//     {
//         title: "English v2",
//         author: "four",
//         genre: ["comics", "comedy", "fiction"]
//     },
//     {
//         title: "Maths v2",
//         author: "five",
//         genre: ["comics v2", "comedy", "fiction"]
//     },
//     {
//         title: "Urdu v2",
//         author: "six",
//         category: "fiction",
//         genre: ["comics v3", "comedy", "fiction"]
//     }
// ]).then((res) => {
//     console.log(res);
// }).catch((err) => {
//     console.log(err);
// })


Book.findByIdAndUpdate("6856a014cc02f92bbaf215f5", { category: "fiction2" }, { runValidators: true }).then((res) => {
    console.log(res);
}).catch((err) => {
    console.log(err.errors.category.properties.message); // to access error in message
})