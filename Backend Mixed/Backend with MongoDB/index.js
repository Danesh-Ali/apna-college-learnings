const express = require("express")
const app = express()
const mongoose = require("mongoose")
const path = require("path")
const Chat = require("./models/chat.js")
const methodOverride = require("method-override")

const PORT = 5000;

// modal pending homework


app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, "views"))

app.use(express.static(path.join(__dirname, "public")))

app.use(express.urlencoded({ extended: true })) // for prase data req.body while using form

app.use(methodOverride("_method"))

main().then((res) => {
    console.log("Connection Successfully ");
}).catch((err) => {
    console.log(err);
})

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp")
}

// const chat1 = new Chat({
//     from: "One",
//     to: "Two",
//     msg: "Hello everyone",
//     created_at: new Date()

// })

// chat1.save().then((res) => {
//     console.log(res);
// }).catch((err) => {
//     console.log(err);
// })

//STEP 1
// Render Index All Chats

app.get("/chats", async (req, res) => {
    let allChats = await Chat.find()
    res.render('index.ejs', { allChats })

})
//render new chat form

app.get("/chats/new", (req, res) => {
    res.render("newChat.ejs")
})

// redirect to chats page after submitting data and saving data in database

app.post('/chats', (req, res) => {
    let { from, to, msg } = req.body;

    let newChat = new Chat({
        from: from,
        to: to,
        msg: msg,
        created_at: new Date()

    })

    newChat.save().then((res) => { console.log('data was saved') }).catch((err) => { console.log(err) })
    res.redirect("/chats")
})

// Step 3 update edit page to refill the detail for edit edition STEP 1 for update
app.get("/chats/:id/edit", async (req, res) => {
    let { id } = req.params
    let editChat = await Chat.findById(id)

    res.render("edit", { editChat })
})

//  STEP 2 for update route

app.put("/chats/:id", async (req, res) => {
    let { id } = req.params
    let { msg: newMsg } = req.body
    let updatedChat = await Chat.findByIdAndUpdate(id, { msg: newMsg }, { runValidators: true, new: true })
    console.log(updatedChat)
    res.redirect("/chats")
})


// DELETE / Destrroy Route
app.delete("/chats/:id", async (req, res)=>{
    let { id } = req.params
    let deleteChat = await Chat.findByIdAndDelete(id) 
    console.log(deleteChat)
    res.redirect('/chats')
})

app.get("/", (req, res) => {
    res.send("root is working")
})

app.listen(PORT, () => {
    console.log("Listening on POrt", PORT);

})