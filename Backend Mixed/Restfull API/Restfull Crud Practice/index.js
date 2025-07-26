const express = require("express")
const path = require("path")
const app = express()
const { v4: uuidv4 } = require("uuid")
const methodOverride = require('method-override')  // for change method in html
const port = 4000


app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))
app.use(express.static(path.join(__dirname, "public")))

app.use(express.urlencoded({ extended: true })) // must be use

app.use(methodOverride('_method')) // method chnage query

let posts = [
    {
        id: uuidv4(),
        username: "Danish",
        content: "test1"
    },
    {
        id: uuidv4(),
        username: "Babar",
        content: "test2"
    }
]

//render ejs files
app.get("/allPosts", (req, res) => {
    res.render('index.ejs', { posts }) //send post vaiable to ejs app
})
app.get("/allPosts/create", (req, res) => {
    res.render('create.ejs')
})

// create post
app.post("/allPosts", (req, res) => {
    let { username, content } = req.body  // url encoded must be use 
    let id = uuidv4()
    posts.push({ id, username, content })
    console.log(req.body)
    res.redirect("/allPosts")
})

// for show one whole blog/ content at a time

app.get("/allPosts/:id", (req, res) => {
    let { id } = req.params
    let post = posts.find((p) => p.id === id)
    res.render("show.ejs", { post }) // show in ejs file

})

// for edit connect below both routes patch/put

app.patch("/allPosts/:id", (req, res) => {
    let { id } = req.params
    let newContent = req.body.content
    let post = posts.find((p) => p.id === id)
    post.content = newContent
    console.log(post)
    res.redirect("/allPosts")
})

app.get("/allPosts/:id/edit", (req, res) => {
    let { id } = req.params
    let post = posts.find((p) => p.id === id)
    res.render("edit.ejs", { post })
})

//  for delete 
app.delete("/allPosts/:id", (req,res)=>{
      let { id } = req.params
    posts = posts.filter((p) => p.id !== id)  // can't use for as variable
    console.log(posts)
    res.redirect("/allPosts")
})


app.listen(port, () => {
    console.log('Working port', port)

})