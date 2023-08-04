const express = require("express");
const mysql = require("mysql2");
const uuid = require("uuid");
const router = express.Router();

/*
TODO
 make sure users can't delete other's projects - add a UserID = (userid from context) to sql in /:title
 */


//uuidv4 for use as uuidv5 namespace
const NAMESPACE = 'b466ea01-361f-420c-acda-f63263237c5c';
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
    console.log("addproject received request: ")
    console.log(req.body);
    const projID = uuid.v5(req.body.title, NAMESPACE);
    const sql = "INSERT INTO Projects VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    //using .map on the below array is kind of a waste, since all are required and so only tag could be null
    //still, it's a small array and shouldn't waste too much time.
    connector.query(sql, [
        projID,
        "Dummy-UserID", // don't leave this hardcoded: add userID from user context once implemented,
        req.body.title,
        req.body.shortdesc,
        req.body.fulldesc,
        req.body.genskill,
        req.body.skillfocus,
        req.body.specskill1,
        req.body.specskill2,
        req.body.specskill3,
        req.body.tag1,
        req.body.tag2,
        req.body.leadmaker,
        req.body.lmemail,
    ].map(x => (x===null||x===undefined||x==='')? null : x), (err, data) => {
        if(err) throw err;
        console.log(`Project ID: ${projID}`);
        console.log(data);
        res.json(data); //200 OK
    });
})

router.post("/recprojects", (req, res) => {
    console.log("starting recommendation algorithm");
    // variables
    let [user, rows] = [null, []];
    // fetch user data for comparison/s
    let sql = "SELECT General_Skill, Skill_Focus, Specific_Skill_1, Specific_Skill_2, Specific_Skill_3, Tag, Minor FROM Users WHERE UserID = ?";
    connector.query(sql, [req.body.userid], (err, data) => {
        console.log(data);
        user = data[0];
    });
    // fetch project data and stream each row
    sql = "SELECT * FROM Projects"; // TODO add this when we have more users: WHERE UserID != ?
    let query = connector.query(sql, [req.body.userid]);
    let err = false;
    query
        .on('error', (err) => {
            err = true;
            throw err;
        })
        // each row
        .on('result', (row) => {
            let score = user["General_Skill"] === row["General_Skill"] ? 1 : 0;
            score = user["Skill_Focus"] === row["Skill_Focus"] ? ++score : score;
            score = user["Specific_Skill_1"] === row["Specific_Skill_1"] ? ++score : score;
            score = user["Specific_Skill_2"] === row["Specific_Skill_2"] ? ++score : score;
            score = user["Specific_Skill_3"] === row["Specific_Skill_3"] ? ++score : score;
            //only one of these can be true
            score = (user["Tag"] === row["Tag_1"]) || (user["Tag"] === row["Tag_2"]) ? ++score : score;
            //General skills are schools and Focuses are majors. It makes sense to compare Minor with Majors, right?
            score = user["Minor"] === row["Skill_Focus"] ? ++score : score;
            row["Score"] = score;
            rows.push(row);
        })
        // all data transmitted
        .on('end', () => {
            // end event is fired on error. do not attempt to sort.
            if(err) {
                res.sendStatus(500);
                return;
            }
            // use the row's scores for a counting sort
            // TODO remove the hardcoded count length. it needs to have (maximum score) indexes
            let [j, count, output] = [0, Array(8).fill(0), []];
            for(let i = 0; i < rows.length; i++){
                j = rows[i]["Score"];
                count[j]++;
            }
            for(let i = count.length - 2; i >= 0 ; i--){
                count[i] = count[i] + count[i+1];
            }
            for(let i = 0; i < rows.length; i++){
                j = rows[i]["Score"];
                count[j]--;
                output[count[j]] = rows[i];
            }
            console.log(output);
            res.json(output);
        });
})

router.delete('/:title', (req, res) => {
    const projID = uuid.v5(req.params.title, NAMESPACE);
    const sql = "SET SQL_SAFE_UPDATES = 0; DELETE FROM Projects WHERE ProjectID = ?; SET SQL_SAFE_UPDATES = 1";
    connector.query(sql, [projID], (err, data) => {
        if(err) throw err;
        console.log(data);
        res.json(data["1"]); //200 OK (consider 204 no content)
        //data["1"] ignores the useless responses from the SAFE_UPDATE processing
    });
})

router.get('/clearprojects', (req, res) => {
    //cleanup
    const sql = "SET SQL_SAFE_UPDATES = 0; DELETE FROM Projects; SET SQL_SAFE_UPDATES = 1";

    connector.query(sql, (err, data) => {
        if(err) throw err;
        console.log(data);
        res.json(data["1"]); //200 OK (consider 204 no content)
        //data["1"] ignores the useless responses from the SAFE_UPDATE processing
    });
})

module.exports = router;