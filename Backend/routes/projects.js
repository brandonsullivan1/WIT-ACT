const express = require("express");
const mysql = require("mysql2");
const uuid = require("uuid");
const router = express.Router();

const connector = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "SeniorProject2023",
    database: "WIT_ACT",
    multipleStatements: true
});

router.get('/', (req, res) => {
    const sql = "SELECT * FROM Projects";

    connector.query(sql, (err, data) => {
        if (err) throw err;
        console.log(data);
        res.json(data); // 200 OK
    });
})

router.post('/addproject', (req, res) => {
    console.log(req.body);
    const projID = uuid.v4();
    const sql = "INSERT INTO Projects VALUES (?, ?, ?, ?, ?, ?)";
    connector.query(sql, [
        projID,
        req.body.title,
        req.body.shortdesc,
        req.body.fulldesc,
        req.body.leadmaker,
        req.body.lmemail,
    ].map(x => (x===null||x===undefined||x==='')? null : x), (err, data) => {
        if(err) throw err;
        console.log(`Project ID: ${projID}`);
        console.log(data);
        res.json({
            projectID: projID,
            queryData: data,
        }); //200 OK
    });
})

router.get('/clearprojects', (req, res) => {
    //cleanup
    const sql = "SET SQL_SAFE_UPDATES = 0; DELETE FROM wit_act.Projects; SET SQL_SAFE_UPDATES = 1";

    connector.query(sql, (err, data) => {
        if(err) throw err;
        console.log(data);
        res.json(data["1"]); //200 OK (consider 204 no content)
        //data["1"] ignores the useless responses from the SAFE_UPDATE processing
    });
})

module.exports = router;