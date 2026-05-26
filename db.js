const mongoose = require('mongoose');

require('dotenv').config();

// const mongooseURL = 'mongodb://localhost:27017/restaurant';
 const mongoURL = process.env.DB_URL || 'mongodb://localhost:27017/restaurant';
mongoose.connect(mongoURL).catch(err => {
    console.error("Initial connection failed:", err);
    process.exit(1);
});

const db = mongoose.connection;

db.on('open', () => console.log("Connected to database successfully"));
db.on('error', (err) => console.error("Database error:", err));
db.on('disconnected', () => console.log("Disconnected from database"));

module.exports = db;