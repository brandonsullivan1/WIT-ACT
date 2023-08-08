const express = require('express');
const cors = require('cors');
const users = require("./routes/users");
const projects = require("./routes/projects");

/*
 This file defines the API server for handling frontend requests to the database.  It's very simple,
 only setting up options for Cross-Origin Resource Sharing (CORS, required due to both API and frontend URIS)
 and importing the two routers that handle the different routes accessed by the frontend.

 The route handlers defined in the routers are much like functions: Each one performs some query on the database,
 typically using information in the request, then returns the response for a status check and use by the frontend.
 */

const app = express();
const corsOptions = {
    origin: RegExp(/http:\/\/localhost:3[01]00.*/)
}
app.use(cors(corsOptions));
app.use(express.json());

app.use("/users", users);
app.use("/projects", projects);

app.get('/', (req, res) => {
    res.json("Accessed backend!"); // 200 OK
});

app.listen(3100, () => {
    console.log("Listening on port 3100...");
});

