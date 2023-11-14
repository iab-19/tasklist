const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');
const taskSchema = require('./Task');

// Define the user schema
const userSchema = new Schema({
    username: {
        type: String,
        requried: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        minLength: 8,
    },
    tasks: [taskSchema],
});

// Hash the password before saving it to the database
userSchema.pre('save', async function (next) {
    if (this.isNew || this.isModified('password')) {
        const saltrounds = 10;
        this.password = await bcrypt.hash(this.password, saltrounds);
    }
    next();
});

// verify user's password
userSchema.methods.isCorrectPassword = async function (password) {
    return bcrypt.compare(password, this.password);
};

// Create User model using the schema
const User = model('User', userSchema);

// Export the User model
module.exports = User;
