const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const corsOptions = require('./config/corsOptions')
const { logger } = require('./middleware/logEvents');
const errorHandler = require('./middleware/errorHandler');
const PORT = process.env.PORT || 3500;

/** MIDDLEWARE **/
/* custom middleware */
//request and error logging
app.use(logger);
app.use(errorHandler);

/* built-in middleware */
app.use(express.json());
//urlencoded (form) data
app.use(express.urlencoded({extended: false})); 
//Cross-Origin Resource Sharing
app.use(cors(corsOptions)); // REMOVE !origin FROM CORSOPTIONS AFTER DEVELOPMENT!!!!!

/** ROUTERS **/
app.use('/api', require('./routes/api/users'));
//catch-all route handler
app.all('*', (req, res) => {
    res.sendStatus(404);
});
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));