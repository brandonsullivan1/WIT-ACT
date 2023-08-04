const express = require("express");
const mysql = require("mysql2");
const uuid = require("uuid")
const router = express.Router();

/*
TODO
 remove the bandaid fix in adduser where 'Select specific skill' maps to null
    - This will probably need work on the frontend to convert that into a placeholder value instead of an actual
        string in /components/Skills.jsx, but it's been uncooperative and we have other priorities
 !!!!! make fetchuser check passwords
 */
const connector = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "SeniorProject2023",
    database: "WIT_ACT",
    multipleStatements: true
});

// TESTING/DEVELOPMENT ROUTES
router.get('/', (req, res) => {
    const sql = "SELECT * FROM Users";

    connector.query(sql, (err, data) => {
        if (err) throw err;
        console.log(data);
        res.json(data); // 200 OK
    });
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

// REGISTRATION
router.post('/adduser', (req, res) => {
    console.log(req.body);
    const userID = uuid.v4() // random user ID  TODO update to use a cryptographically secure RNG "crypto" lib
    const sql = "INSERT INTO Users VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    connector.query(sql, [
        "Dummy-UserID", //userID,
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

// LOGIN
router.post('/fetchuser', (req, res) => {
    const sql = "SELECT * FROM Users WHERE email = ?";
    console.log(req.body.email);
    connector.query(sql, [req.body.email], (err, data) => {
        console.log("in fetchuser");
        if(err) throw err;
        if(data[0] === undefined){
            res.status(404).json(`No users found matching email ${req.body.email}!`);
        } else {
            res.json(data[0]); // users should be unique, still need index because array is returned
        }
    })
})

// PROFILE UPDATES
router.post('/')

module.exports = router;