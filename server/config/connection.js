const mongoose = require('mongoose');

// connect to the mongoose database
mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/tasklist');

module.exports = mongoose.connection;
