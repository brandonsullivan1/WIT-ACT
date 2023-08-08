const express = require("express");
const mysql = require("mysql2");
const uuid = require("uuid");
const router = express.Router();


/*
 This file defines handlers for any routes that will use the Projects table. All routes are of the form:
 http://localhost:3100/projects<path>, where <path> is the path specified by the handler.  This file also contains
 our recommendation algorithm, which takes a user and returns an array of all projects, sorted by relevance.
 Relevance is calculated based on matching General Skill, Skill Focus, Specific Skills, Minor, and Tag to compute a
 score for each project, then running a counting sort on these scores to order projects.
 */

/*
TODO
 - Make sure users can't delete other's projects - add a UserID = (userid from context) to sql in /:title
 - Add some kind of handling for duplicate project names: either don't allow it or change id calculation
 - CURRENT project handling creates card for project despite DB error - investigate if a different fix isn't made
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

// TESTING/DEVELOPMENT ROUTES
router.get('/', (req, res) => {
    const sql = "SELECT * FROM Projects";

    connector.query(sql, (err, data) => {
        if (err) throw err;
        res.json(data); // 200 OK
    });
})

router.get('/clearprojects', (req, res) => {
    //cleanup
    const sql = "SET SQL_SAFE_UPDATES = 0; DELETE FROM Projects; SET SQL_SAFE_UPDATES = 1";
    connector.query(sql, (err, data) => {
        if(err) throw err;
        res.json(data["1"]); //200 OK (consider 204 no content)
        //data["1"] ignores the useless responses from the SAFE_UPDATE processing
    });
})

router.post('/addproject', (req, res) => {
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
        res.json(data); //200 OK
    });
})

router.post("/recprojects", (req, res) => {
    // variables
    let [user, rows] = [null, []];
    // fetch user data for comparison/s
    let sql = "SELECT General_Skill, Skill_Focus, Specific_Skill_1, Specific_Skill_2, Specific_Skill_3, Tag, Minor FROM Users WHERE UserID = ?";
    connector.query(sql, [req.body.userid], (err, data) => {
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
            // TODO remove the hardcoded count length. it needs to have a number of indices equal to the max value of score
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
            res.json(output);
        });
})

router.delete('/:title', (req, res) => {
    const projID = uuid.v5(req.params.title, NAMESPACE);
    const sql = "SET SQL_SAFE_UPDATES = 0; DELETE FROM Projects WHERE ProjectID = ?; SET SQL_SAFE_UPDATES = 1";
    connector.query(sql, [projID], (err, data) => {
        if(err) throw err;
        res.json(data["1"]); //200 OK (consider 204 no content)
        //data["1"] ignores the useless responses from the SAFE_UPDATE processing
    });
})

module.exports = router;