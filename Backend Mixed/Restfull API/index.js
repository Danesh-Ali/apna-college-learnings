const express = require("express");
const app = express();
const path = require("path");
const { v4: uuidv4 } = require("uuid")
const methodOverride = require('method-override')  // for change method in html
const port = 4000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(methodOverride('_method')) // method chnage query

app.listen(port, () => {
    console.log(`Server Connected on port ${port}`);
});

let posts = [
    { id: uuidv4(), username: "Shahid", content: "We love coding!" },
    { id: uuidv4(), username: "Tahir", content: "We love coding 2" }
];

app.get("/posts", (req, res) => {
    res.render("index.ejs", { posts });
});

app.get("/posts/new", (req, res) => {
    res.render("postForm.ejs")
})
app.post("/posts", (req, res) => {
    const { username, content } = req.body
    let id = uuidv4()
    posts.push({ id, username, content })
    res.redirect("/posts")
})

app.get("/posts/:id", (req, res) => {
    let { id } = req.params
    let post = posts.find((p) => id === p.id)
    res.render('show.ejs', { post })

})


app.patch("/posts/:id", (req, res) => {  // this is chnage the content data
    let { id } = req.params
    let newContent = req.body.content
    let post = posts.find((p) => id === p.id)
    post.content = newContent
    console.log(post)
    res.redirect("/posts")
})

app.get("/posts/:id/edit", (req, res) => {
    let { id } = req.params
    let post = posts.find((p) => id === p.id)
    console.log(post)
    res.render('edit.ejs', { post })
})

app.delete("/posts/:id", (req, res) => {
    let { id } = req.params
    posts = posts.filter((p) => id !== p.id)
    console.log(posts)
    res.redirect("/posts")
})



