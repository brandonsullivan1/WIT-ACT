const express = require("express");
const mysql = require("mysql2");
const uuid = require("uuid")
const router = express.Router();

/*
TODO
 - remove the bandaid fix in adduser and updateSkills where 'Select specific skill' maps to null
    - This will probably need work on the frontend to convert that into a placeholder value instead of an actual
        string in /components/Skills.jsx, but it's been uncooperative and we have other priorities
 !!!!! make fetchuser check passwords
 - change functions using a "Dummy-UserID" to take a userID from the request body, update frontend submit requests to
   accomodate
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

/** REGISTRATION **/
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

/** LOGIN **/
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

/** PROFILE UPDATES **/
// ACCOUNT.JSX HANDLERS
router.post('/updatePassword', (req, res) => {
    const sql = "UPDATE Users SET Password=? WHERE UserID=?";
    connector.query(sql, [req.body.password, req.body.userid], (err, data) => {
        if(err) throw err;
        console.log(data);
        res.json(data);
    })
})
router.post('/updateMinor', (req, res) => {
    const userID = "Dummy-UserID";
    const sql = "UPDATE Users SET Minor=? WHERE UserID=?";
    console.log(`Updating user ${userID} with minor ${req.body.minor}...`);
    connector.query(sql, [req.body.minor, req.body.userid], (err, data) => {
        if(err) throw err;
        console.log(data);
        res.json(data);
    })
})
router.post('/updateTag', (req, res) => {
    const sql = "UPDATE Users SET Tag=? WHERE UserID=?";
    connector.query(sql, [req.body.tag, req.body.userid], (err, data) => {
        if(err) throw err;
        console.log(data);
        res.json(data);
    })
})

// SKILLS.JSX HANDLER
router.post('/updateSkills', (req, res) => {
    const sql = "UPDATE Users SET General_Skill=?, Skill_Focus=?, Specific_Skill_1=?, Specific_Skill_2=?, " +
        "Specific_Skill_3=? WHERE UserID=?";
    connector.query(sql, [
        req.body.genskill,
        req.body.skillfocus,
        req.body.specskill1,
        req.body.specskill2,
        req.body.specskill3,
        req.body.userid
    ].map(x => (x===null||x===undefined||x===''||x==='Select specific skill...')? null : x), (err, data) => {
        if(err) throw err;
        console.log(data);
        res.json(data);
    })
})
// CONTACTINFO.JSX HANDLERS
router.post('/updatePhone', (req, res) => {
    const sql = "UPDATE Users SET Phone_Number=? WHERE UserID=?";
    connector.query(sql, [req.body.phone, req.body.userid], (err, data) => {
        if(err) throw err;
        console.log(data);
        res.json(data);
    })
})
router.post('/updateDiscord', (req, res) => {
    const sql = "UPDATE Users SET Discord=? WHERE UserID=?";
    connector.query(sql, [req.body.discord, req.body.userid], (err, data) => {
        if(err) throw err;
        console.log(data);
        res.json(data);
    })
})

module.exports = router;