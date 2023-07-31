const express = require("express");
const mysql = require("mysql2");
const uuid = require("uuid")
const router = express.Router();

/*
TODO
 remove the bandaid fix in adduser where 'Select specific skill' maps to null
    - This will probably need work on the frontend to convert that into a placeholder value instead of an actual
        string in /components/Skills.jsx, but it's been uncooperative and we have other priorities
 */
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
    const userID = uuid.v4() // random user ID  TODO update to use a cryptographically secure RNG "crypto" lib
    const sql = "INSERT INTO Users VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    connector.query(sql, [
        userID,
        req.body.name,
        req.body.email,
        req.body.password,
        req.body.genskill,
        req.body.skillfocus,
        req.body.specskill1,
        req.body.specskill2,
        req.body.specskill3,
        req.body.tag,
        null, //minor
        req.body.phone,
        req.body.discord
    ].map(x => (x===null||x===undefined||x===''||x==='Select specific skill...')? null : x), (err, data) => {
        if(err) throw err;
        console.log(data);
        res.json(data); //200 OK
    });
})

router.post('/fetchuser', (req, res) => {
    const sql = "SELECT * FROM Users WHERE email = ?";
    console.log(req.body.email);
    connector.query(sql, [req.body.email], (err, data) => {
        console.log("in fetchuser");
        if(err) throw err;
        console.log(data);
        console.log(data["0"]["Email"]);
        res.sendStatus(200);
    })
})

router.get('/clearusers', (req, res) => {
    //cleanup
    const sql = "SET SQL_SAFE_UPDATES = 0; DELETE FROM Users; SET SQL_SAFE_UPDATES = 1";

    connector.query(sql, (err, data) => {
        if(err) throw err;
        console.log(data);
        res.json(data["1"]); //200 OK (consider 204 no content)
    });
})

module.exports = router;