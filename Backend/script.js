// import express from "express";
// import path from "path";


const express = require("express")
const path = require("path")

const app = express();
const port = 4000;

app.set("view engine", "ejs"); // mandatory
app.set("views", path.join(__dirname, "/views")); // mandatory

app.get("/", (req, res) => {
    res.render("home.ejs");
});


app.get("/diceroll", (req, res) => {
    let diceNumber = Math.floor(Math.random() * 6) + 1 // assuming this is db coming data
    res.render("diceRole.ejs", { diceNumber })
})


app.get("/ig/:username", (req, res) => {
    let { username } = req.params // Extract the username from the URL coming
    const instaDatabase = require("./data.json")
    

    const data = instaDatabase[username] // Get user data based on username
    
    if(data){
        res.render("instagram.ejs", { data })
    }else{
        res.render('error.ejs')
    }
})

app.listen(port, () => {
    console.log(`Working port Connected ${port}`);
});
