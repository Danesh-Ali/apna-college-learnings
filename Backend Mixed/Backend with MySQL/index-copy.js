const mysql = require("mysql2")
const { faker } = require('@faker-js/faker');
const { v4: uuid } = require('uuid');
const express = require("express")

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "test",
    password: "Abcd@1234"
})


function getFakeUsers() {
    return [
        faker.string.uuid(),
        faker.internet.username(),
        faker.internet.email(),
        faker.internet.password(12, true)
    ]
}

const data = []
for (let i = 1; i <= 100; i++) {
    data.push(getFakeUsers())
}

// inserting data
let q = "INSERT INTO temp (id,username,email,password) VALUES ?"

let show = "SELECT * FROM temp"

// let users = [


//     [5, "four", "five@gmail.com", "abc4"],

// ];

try {
    connection.query(q, [data], (err, result) => {
        if (err) throw err
        console.log(result)
    })
} catch (error) {
    console.log(error)
}

connection.end()


