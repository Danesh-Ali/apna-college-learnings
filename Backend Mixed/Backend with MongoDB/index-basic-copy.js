const express = require("express")
const app = express()
const mongoose = require("mongoose")

const PORT = 5000;


app.set('view engine','ejs')
app.set('views', path.join(__dirname, "views"))

main().then((res) => {
    console.log("Connection Successfully ");
}).catch((err) => {
    console.log(err);
})

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp")
}

app.get("/", (req, res) => {
    res.send("root is working")
})

app.listen(PORT, () => {
    console.log("Listening on POrt", PORT);

})