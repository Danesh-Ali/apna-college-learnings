const mongoose = require("mongoose")
const Chat = require("./models/chat.js")

main().then((res) => {
    console.log("Connection Successfully ");
}).catch((err) => {
    console.log(err);
})

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp")
}


const allChats = [
    {
        from: "One",
        to: "one",
        msg: "Hello everyone",
        created_at: new Date()
    },
    {
        from: "two",
        to: "two",
        msg: "Hello friends",
        created_at: new Date()
    },
    {
        from: "three",
        to: "three",
        msg: "Hello guys!",
        created_at: new Date()
    }
]

Chat.insertMany(allChats)