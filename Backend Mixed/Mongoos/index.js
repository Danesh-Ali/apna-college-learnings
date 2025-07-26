const mongoose = require("mongoose")

main().then(() => {
    console.log("Connection Sucessfull");
}).catch(err => console.log(err))

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/test")
}



const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    age: Number
})

const User = mongoose.model("User", userSchema)

//  findByIdAndUpdate(), findOneAndUpdate() , findOneAndDelete(condition) , findByIdAndDelete(only id)

User.findByIdAndUpdate(("685684e8f70d0e507fdf5a8b"),{ age: 30 }).then((res) => {
    console.log(res);
}).catch((err) => {
    console.log(err);
})

//  updateOne(value, replace value), updateMany(Multiple users update at same command)

// User.updateOne({ name: "two" }, { age: 90 }).then((res) => {
//     console.log(res);
// }).catch((err) => {
//     console.log(err);
// })

// Find data with these methods find({}), findOne(condition), findById(only id in string)

User.findOne({ name: { $eq: "one" } }).then((res) => {
    console.log("find succesccfull", res);
}).catch((err) => {
    console.log(err);
})

// insert data multile in mongoose

// User.insertMany([
//     { name: "three", email: "three@gmail.com", age: 30 },
//     { name: "four", email: "four@gmail.com", age: 40 },
//     { name: "five", email: "five@gmail.com", age: 50 }
// ]).then((res) => {
//     console.log(res);
// })

// const user1 = new User({ name: "one", email: "one@gmail.com", age: 12 })
// const user2 = new User({ name: "two", email: "two@gmail.com", age: 20 })

// user1.save()

// // save method return promise so we can use then catch too
// user2.save().then((res) => {
//     console.log(res);
// }).catch((err) => {
//     console.log(err);
// })