const mongoose = require('mongoose');

async function dbconnect() {
  await mongoose.connect('mongodb://localhost:27017/userLogic');

  const db = mongoose.connection;

  db.on('error', console.error.bind(console, 'Connection error'));
  db.once('open', () => {
    console.log('Connected to db');
  });
}

module.exports = dbconnect;
