const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/userLogic');

const db = mongoose.connection;

db.on(err, console.errer.bind(console, 'Connection error'));
db.once('open', () => {
  console.log('Connected to db');
});
