const express = require('express');
const connection = require('./database/connection');
const path = require('path');
const cors = require('cors');

const app = express();
const port = 3001;

app.use(cors());
app.use('/',require(path.join(__dirname,'routes/route.js')));

app.listen(port,()=>{
    console.log(`Backend server running on port ${port}`);
});