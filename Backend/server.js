const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const connector = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "SeniorProject2023",
    database: "WIT_ACT",
});

app.get('/', (req, res) => {
    return res.json("From backend");
});

app.get('/users', (req, res) => {
    const sql = "SELECT * FROM Users";

    connector.query(sql, (err, data) => {
        if (err) return res.json(err);
        console.log(data);
        return res.json(data);
    })
})

app.listen(3100, () => {
    console.log("Listening on port 3100...");
});

