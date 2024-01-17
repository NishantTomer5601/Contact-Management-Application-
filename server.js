const express = require('express');
const errorHandler = require('./middleware/errorHandler');
const Connectdb = require('./config/dbConnection');
const dotenv=require("dotenv").config();
const fs=require('fs');
const bodyParser = require('body-parser');
Connectdb();
const app = express();
const port = process.env.PORT || 5000


app.use(bodyParser.json());

//adding middleware for express json
app.use(express.json());
// adding middleware
app.use(express.static(__dirname ));

app.get('/', (req, res) => {
  res.sendFile(__dirname+"/index.html");
});

app.use('/api/contacts', require("./routes/ContactRoutes"));
app.use('/api/users', require("./routes/userRoutes"));

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})