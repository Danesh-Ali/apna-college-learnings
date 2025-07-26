const mysql = require("mysql2")
const { faker } = require('@faker-js/faker');
const { v4: uuid } = require('uuid');
const express = require("express")
const path = require("path")
const methodOverride = require("method-override")

const app = express()

app.use(methodOverride("_method"))
app.use(express.urlencoded({ extended: true }))

app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "test",
    password: "Abcd@1234"
})



// count show
app.get("/", (req, res) => {
    let q = `SELECT COUNT(*) FROM temp`
    try {
        connection.query(q, (err, result) => {
            if (err) throw err
            let count = result[0]['COUNT(*)']
            res.render('home.ejs', { count })
        })
    } catch (err) {
        console.log(err)
        res.send('some error occur in DB')
    }
})

// user show
app.get("/users", (req, res) => {
    let q = `SELECT * FROM temp`
    try {
        connection.query(q, (err, result) => {
            if (err) throw err
            let users = result
            res.render('user.ejs', { users })
        })
    } catch (err) {
        console.log(err)
        res.send('some error occur in DB')
    }
})

// user edit
app.get("/users/:id/edit", (req, res) => {
    let { id } = req.params
    let q = `SELECT * FROM temp WHERE id='${id}'`

    try {
        connection.query(q, (err, result) => {
            if (err) throw err
            let user = result[0]
            res.render('edit.ejs', { user })
        })
    } catch (err) {
        console.log(err)
        res.send('some error occur in DB')
    }

})

// update db route 

app.patch('/users/:id', (req, res) => {
    let { id } = req.params
    let { password: formPass, username: newUser } = req.body
    let q = `SELECT * FROM temp WHERE id='${id}'`

    try {
        connection.query(q, (err, result) => {
            if (err) throw err
            let user = result[0]
            if (formPass != user.password) {
                res.send("wrong Password")
            } else {
                let q2 = `UPDATE temp SET username='${newUser}' WHERE id='${id}'`
                connection.query(q2, (err, result) => {
                    if (err) throw err
                    res.redirect("/users")
                })
            }

        })
    } catch (err) {
        console.log(err)
        res.send('some error occur in DB')
    }
})

// step 1 render the form
app.get('/addUser', (req, res) => {
    res.render("addUser.ejs")
})

// step 2 add post route

app.post("/addUser", (req, res) => {
    const { username, email, password } = req.body
    let id = uuid()
    let q = `INSERT INTO temp (id, username, email, password) VALUES ?`
    let value = [
        [id, username, email, password]
    ]

    try {
        connection.query(q, [value], (err, result) => {
            if (err) throw err
            res.redirect('/users')
        })
    } catch (err) {
        res.send("Something went wrong in DATABASE!")
    }
})


// step 1 to put crednetials for delete user

app.get("/users/:id/delete", (req, res) => {
    let { id } = req.params
    let q = `SELECT * FROM temp WHERE id= ?`

    try {
        connection.query(q, [id], (err, result) => {
            if (err) throw err
            let user = result[0]
            res.render("deleteForm.ejs", { user })
        })
    } catch (err) {
        console.log(err)
        res.send('some error occur in DB')
    }
})

//  step 2 to delete user

app.delete("/users/:id", (req, res) => {
    const { id } = req.params;
    const { email, password } = req.body;
    const q = "SELECT * FROM temp WHERE id = ?";

    try {
        // Find the user by ID (with injection-safe query)
        connection.query(q, [id], (err, results) => {
            if (err) throw err
            const user = results[0];

            if (email !== user.email || password !== user.password) {
                res.send("Wrong Credentials");
            } else {
                // Now delete the user securely
                let q2 = `DELETE FROM temp  WHERE id= ?`
                connection.query(q2, [id], (err, result) => {
                    if (err) throw err
                    res.redirect("/users");
                });
            }

        });
    } catch (err) {
        res.send("something went wrong in database while deleting user")
    }
});



app.listen("5000", () => {
    console.log("server is working 5000")
})

// try {
//     connection.query(q, [data], (err, result) => {
//         if (err) throw err
//         console.log(result)
//     })
// } catch (error) {
//     console.log(error)
// }
// connection.end()