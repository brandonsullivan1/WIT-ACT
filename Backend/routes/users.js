const express = require("express");
const mysql = require("mysql2");
const router = express.Router();

const connector = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "SeniorProject2023",
    database: "WIT_ACT",
    multipleStatements: true
});

router.get('/', (req, res) => {
    const sql = "SELECT * FROM Users";

    connector.query(sql, (err, data) => {
        if (err) throw err;
        console.log(data);
        res.json(data); // 200 OK
    });
})

router.post('/adduser', (req, res) => {
    console.log(req.body);
    const sql = "INSERT INTO Users VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    connector.query(sql, [
        req.body.name,
        req.body.email,
        req.body.password,
        req.body.major,
        req.body.minor,
        req.body.skill1,
        req.body.skill2,
        req.body.skill3,
        req.body.skill4,
        req.body.skill5,
        req.body.phone,
        req.body.discord
    ].map(x => (x===null||x===undefined||x==='')? null : x), (err, data) => {
        if(err) throw err;
        console.log(data);
        res.json(data); //200 OK
    });
})

router.get('/clearusers', (req, res) => {
    //cleanup
    const sql = "SET SQL_SAFE_UPDATES = 0; DELETE FROM wit_act.Users; SET SQL_SAFE_UPDATES = 1";

    connector.query(sql, (err, data) => {
        if(err) throw err;
        console.log(data);
        res.json(data); //200 OK (consider 204 no content)
    });
})

module.exports = router;