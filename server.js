const express = require('express');
const dbconnect = require('./config/dbconnect');

//Routes
const users = require('./app/routes/users');
const homepage = require('./app/routes/homepage');

const app = express();

app.set('view engine', 'ejs');

dbconnect();

//Makes req.body readable
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Implement routes
app.use(homepage);
app.use(users);

app.listen('3000', () => {
  console.log(`http://localhost:3000`);
});
