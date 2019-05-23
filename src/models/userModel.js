const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const UserSchema = new Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
});

// UserSchema.pre('save', async function(next) {
//     try {
//         //generate salt
//         const salt = await bcrypt.genSalt(10);
//         //hash password
//         const passwordHash = await bcrypt.hash(this.password, salt);
//         //store hashed password
//         this.password = passwordHash;
//         next();
//     } catch (error) {
//         return next(error);
//     }
// });

UserSchema.virtual('fullName').get(function() {
    return `${this.firstname} ${this.lastname}`;
});

// Hash password
UserSchema.pre('save', function(next) {
    if (!this.isModified('password')) return next();
    this.password = this.encryptPassword(this.password);
    next();
});

UserSchema.methods = {
    encryptPassword: (plainTextWord) => {
        if (!plainTextWord) return '';
        const salt = bcrypt.genSaltSync(10);
        return bcrypt.hashSync(plainTextWord, salt);
    },
    comparePassword: function(password) {
        const data = bcrypt.compareSync(password, this.password);
        return data;
    },
};

const User = mongoose.model('User', UserSchema);

module.exports = User;