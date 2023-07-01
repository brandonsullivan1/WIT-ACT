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
    });
})

app.get('/adduser', (req, res) => {
    //WHATEVER TEST DATA IS USED, ALL PHONE NUMBERS SHOULD BE ALL 5s FOR CLEANUP
    const sql = "INSERT INTO Users (FullName, Email, Password, Major, Minor, Skill_1, Skill_2, Skill_3, Skill" +
        "_4, Skill_5, Phone_Number, Discord) VALUES ('Joshua Polischuk', 'polischukj@wit.edu', 'fakepassword', " +
        "'Computer Science', null, 'Node','Express', null, null, null,'555-555-555', 'discordname')";

    connector.query(sql, (err, data) => {
        if(err) return res.json(err);
        console.log(data);
        return res.json(data);
    })
})
app.get('/deleteOne/:id', (req, res) => {
    //cleanup
    const sql = `DELETE FROM Users WHERE UserID=${req.params.id} LIMIT 1`; //LIMIT needed because safe mode

    connector.query(sql, (err, data) => {
        if(err) return res.json(err);
        console.log(data);
        return res.json(data);
    });
})
app.get('/clearDB', (req, res) => {
    //cleanup
    const sql = "DELETE FROM Users WHERE Phone_Number='555-555-555' LIMIT 100"; //LIMIT needed because safe mode

    connector.query(sql, (err, data) => {
        if(err) return res.json(err);
        console.log(data);
        return res.json(data);
    });
})

app.listen(3100, () => {
    console.log("Listening on port 3100...");
});

