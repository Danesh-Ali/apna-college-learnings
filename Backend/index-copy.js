import express from "express"

const app = express()

const port = 4000


app.get("/", (req, res) => {
    res.send("This is root")
})

app.get("/:username/:id", (req, res) => {
    const { username, id } = req.params
    const htmlCode = `<h1> This ismy name @${username} and id is ${id}</h1>`
    res.send(htmlCode)
})

app.get("/search", (req, res) => {
    const { q } = req.query
    if (!q) {
        res.send('<h1>nothing searched</h1>')
    }
    res.send(`Search result s: ${q}`)
})



app.listen(port, () => {
    console.log("connected ,", port)
})
