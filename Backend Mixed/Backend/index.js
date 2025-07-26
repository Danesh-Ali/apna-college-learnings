const express = require("express")

const app = express()

const port = 4000

app.use(express.urlencoded({extended: true})) // for any type of POST data, not for json
app.use(express.json())  // for json data only

app.get("/register", (req, res)=>{
    const {username} = req.query
    res.send(`Welcome ${username} `)
})
app.post("/register", (req, res)=>{
   console.log(req.body)

   const {username} = req.body
 
    res.send(`Welcome POST ${username} `, username)
})





app.listen(port, ()=>{
    console.log(`Server Connected ${port}`)
})