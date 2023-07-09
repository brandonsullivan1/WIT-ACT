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
});

app.post('/adduser', (req, res) => {
    console.log(req.body);
    const sql = "INSERT INTO Users (FullName, Email, Password, Major, Minor, Skill_1, Skill_2, Skill_3, Skill_4, Skill_5, Phone_Number, Discord) " +
        `VALUES ('${req.body.name}', '${req.body.email}', '${req.body.password}', '${req.body.major}', '${req.body.minor}', '${req.body.skill1}', '${req.body.skill2}', '${req.body.skill3}', '${req.body.skill4}', '${req.body.skill5}', '${req.body.phone}', '${req.body.discord}')`
            .replace(/('null'|''|'undefined')/g, "null"); //remove quotes so nulls are not string 'null'
    console.log(sql);
    connector.query(sql, (err, data) => {
        if(err) return res.json(err);
        console.log(data);
        return res.json(data);
    });
});

app.delete('/deleteOne/:id', (req, res) => {
    //cleanup
    const sql = `DELETE FROM Users WHERE UserID=${req.params.id}`; //LIMIT needed because safe mode

    connector.query(sql, (err, data) => {
        if(err) return res.json(err);
        console.log(data);
        return res.json(data);
    });
});

app.delete('/clearDB', (req, res) => {
    //cleanup
    const sql = "DELETE FROM Users WHERE UserID <= 1000000"; //if we hit this during testing we have failed

    connector.query(sql, (err, data) => {
        if(err) return res.json(err);
        console.log(data);
        return res.json(data);
    });
})

app.listen(3100, () => {
    console.log("Listening on port 3100...");
});

