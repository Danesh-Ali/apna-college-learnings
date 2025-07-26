const express = require("express")
const mongoose = require("mongoose")
const path = require("path")
const methodOverride = require("method-override")
const ejsMate = require("ejs-mate")
const ExpressError = require("./utils/expressError.js")
const listingRouter = require("./routes/listing.js") // route
const reviewRouter = require("./routes/review.js") // route
const session = require("express-session");
const flash = require("connect-flash");
const app = express()
const PORT = 5000

// for authenctications
const passport = require("passport")
const LocalStrategy = require("passport-local").Strategy
const User = require("./models/user.js")
const userRouter = require("./routes/user.js")


const MONGODB_URL = "mongodb://127.0.0.1:27017/majorProject"

async function main() {
    await mongoose.connect(MONGODB_URL)
}

main().then(() => {
    console.log("DB Connected");
}).catch((err) => {
    console.log(err);
})



app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))

app.use(express.urlencoded({ extended: true })) // to parse data
app.use(methodOverride("_method"))
app.use(express.static(path.join(__dirname, "public")))

app.engine('ejs', ejsMate); //############################# layouts  boilerplates

const sessionOptions = {
  secret: "SuperSecretCode",
  resave: false,
  saveUninitialized: true,
  cookie:{
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000
  }
};

app.use(session(sessionOptions));
app.use(flash());

// For authentication
app.use(passport.initialize())
app.use(passport.session())
passport.use(new LocalStrategy({ usernameField: 'email' }, User.authenticate())) // passport


passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

// ******************************************

app.get("/", (req, res) => {
    res.send("app root is working") // root
})

app.use((req, res, next)=>{
    res.locals.success = req.flash("success")
    res.locals.error = req.flash("error")
    res.locals.currentUser = req.user
    next()
})

// app.get("/demoUser", async (req, res)=>{
//     const user = new User({
//         email:"abc@gmail.com",
//         username: "Delta"
//     })

//    const registerUser = await User.register(user, "Password")
//    res.send(registerUser)
// })
// ############################################


app.use('/listings', listingRouter) // Listing Route,
app.use('/listings/:id/reviews', reviewRouter) // review  route
app.use('/', userRouter) // review  route


// ###################################################################################

// to check all route is available or not for invalid page route
app.all("*", (req, res, next) => {
    next(new ExpressError(404, "Page not found!"))
})

app.use((err, req, res, next) => {
    // let { status = 500, message = "Something went wrong!" } = err
    // res.status(status).send(message)
    res.render("error/error.ejs", { err })
})









// app.get("/listingTest", async(req,res)=>{
//     const sampleListings = new Listing({
//         title: "Botany House",
//         description: "A simple room pf hotel",
//         price: 1200,
//         location: "Lahore",
//         country:"Pakistan"

//     })

//     await sampleListings.save()
//     console.log("Data save successfully");


//     res.send("working listing data")
// })



app.listen(PORT, () => {
    console.log(`Server is working ${PORT}`);

})