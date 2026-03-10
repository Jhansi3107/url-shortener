const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const path = require('path');

const adapter = new FileSync(path.join(__dirname, '../db.json'));
const db = low(adapter);

// Set some defaults
const connectDB = () => {
    console.log('Using LowDB: local JSON file database...');
    db.defaults({ urls: [] }).write();
};

module.exports = { connectDB, db };
