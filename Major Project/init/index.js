const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const MONGODB_URL = "mongodb://127.0.0.1:27017/majorProject"

async function main() {
    await mongoose.connect(MONGODB_URL)
}

main().then(() => {
    console.log("DB Connected");
}).catch((err) => {
    console.log(err);
})

// isme ye ho rha jo already insert hy wo sb delete krke dubara se new initilize ho jata all

const initDB = async () =>{
    await Listing.deleteMany({})
    await Listing.insertMany(initData.data)
    console.log(initData);

    console.log("Data was Initialized");

}

initDB()