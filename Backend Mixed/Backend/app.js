const express = require("express")
const MyError = require("./utils/error.js")
const app = express()
const port = 4000

// this is middleware we can .use() for middleware 
app.use((req, res, next) => {
    const query = req.query
    console.log("I'm 1st Middleware");
    next()
})

app.use((req, res, next) => {
    console.log("I'm 2nd Middleware");
    return next() // return means stop working code below r after next()
})

// logger but best - morgan npm for logs
app.use((req, res, next) => {
    let time = new Date(Date.now()).toString()
    console.log(req.method, req.path, req.hostname);
    console.log(req.time, time);

    next()
})

// without function token method api middleware
// app.get("/api", (req, res, next) => {
//     let { token } = req.query
//     if (token === "giveAccess") {
//         next()
//     }
//     res.send("ACCESS DENIED TOKEN REQURED!")

// })

// METHOD 2
// for multiple util
const checkToken = (req, res, next) => {
    let { token } = req.query
    if (token === "giveAccess") {
        next()
    }

    throw new MyError(401, "ACCESS DENIED TOKEN REQURED!")

}



app.get("/api", checkToken, (req, res) => {
    res.send("data")
})




app.get("/register", (req, res) => {
    res.send("server is working on root")
})
app.get("/", (req, res) => {
    res.send("server is working on root")
})

app.get("/err", (req, res) => {
    abcd = abcd
})


// app.use((err,req, res, next) => { // middler for agr user kis galat link pr chla jay jo exist na krta ho
//     // res.send("page not found")
//     res.send(err)
//     next()
// })

app.get("/admin", (res, req)=>{
    throw new MyError(403, "Access to admin is Forbidden")
})

app.use((err,req, res, next) => { 
    let {status = 500, message= "Something went wrong!" } = err
    res.status(status).send(message) // for client side proper erring
})


app.listen(port, () => {
    console.log(`Server Connected ${port}`)
})