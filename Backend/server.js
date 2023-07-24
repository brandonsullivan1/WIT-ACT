const express = require('express');
const cors = require('cors');
const users = require("./routes/users");
const projects = require("./routes/projects");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/users", users);
app.use("/projects", projects);

app.get('/', (req, res) => {
    res.json("Accessed backend!"); // 200 OK
});

app.listen(3100, () => {
    console.log("Listening on port 3100...");
});

