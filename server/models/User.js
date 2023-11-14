const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

// Define the user schema
const userSchema = new Schema({
    username: {
        type: String,
        requried: true,
        unique: true,
        trim: true,
    },
    password: {
        stype: String,
        required: true,
        minLength: 8,
    },
    tasks: [
        {
            type: Schema.Types.ObjectId,
            ref: Task,
        }
    ],
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
userSchema.methonds.isCorrectPassword = async function (password) {
    return bcrypt.compare(password, this.password);
};

// Create User model using the schema
const User = model('User', userSchema);

// Export the User model
module.exports = User;
