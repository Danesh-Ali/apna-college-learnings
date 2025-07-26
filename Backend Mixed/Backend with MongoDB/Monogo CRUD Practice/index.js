const express = require("express")
const mongoose = require("mongoose")
const path = require("path")
const app = express()
const Book = require("./models/book.js")
const methodOverride = require("method-override")
const MyError = require("./utils/Error.js")
const asyncWrap = require("./utils/AsyncWrap.js")


app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))


app.use(express.static(path.join(__dirname, "public")))

app.use(methodOverride("_method"))

app.use(express.urlencoded({ extended: true })) // req.body update


const PORT = 5000
connectDatabase().then(() => {
    console.log("DB Connection Succesfully Connected");
}).catch((err) => {
    console.log(err);
})


async function connectDatabase() {
    await mongoose.connect("mongodb://127.0.0.1:27017/practice")
}




app.get("/allData",asyncWrap(async (req, res) => {
    let allData = await Book.find({})

    res.render("index.ejs", { allData })
}))

app.get("/allData/:id/edit", asyncWrap(async (req, res, next) => {
    let { id } = req.params
    let editData = await Book.findById(id)
    if (!editData) {
        throw new MyError(500,"User not found"); // or whatever your MyError signature is
    }

    res.render("edit.ejs", { editData })

}))

app.put("/editData/:id", asyncWrap(async (req, res) => {
    let { id } = req.params
    let { title, price, category, author } = req.body
    let updateNewData = await Book.findByIdAndUpdate(id, { title, price, category, author })
    console.log(updateNewData);
    res.redirect("/allData")

}))

app.delete("/allData/:id", asyncWrap(async (req, res) => {
    let { id } = req.params
    let deleteRecord = await Book.findByIdAndDelete(id)
    console.log("Document Record Deleted", deleteRecord);

    res.redirect("/allData")

}))

app.get("/", (req, res) => {
    res.send("Server is working")
})

const handleValidationErr = (err) =>{
    console.log("This is Validation error. Please follow the rules");
    return err
}

app.use((err, req, res, next)=>{
    console.log(err.name);
    if(err.name === 'ValidationError'){
        err = handleValidationErr(err)
    }

    next(err)
})

// Error handling Middleware
app.use((err, req, res, next) => {
    let { status = 500, message = "Something Went wrong" } = err
    res.status(status).send(message)
})

app.use(( req, res,) => {
   res.send("Page not found")
})

app.listen(PORT, (req, res) => {
    console.log("Server Connected", PORT);

})