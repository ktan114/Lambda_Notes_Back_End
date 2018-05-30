const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    }
})

userSchema.pre('save', function(next){
    return bcrypt.hash(this.password, 11, (err, hash) => {
        if (err) {
            return next(err)
        } 
        this.password = hash;
        
        return next()
    })
})

userSchema.methods.validatePassword = function(guess, cb) {
    return bcrypt.compare(guess, this.password)
}

module.exports = mongoose.model('User', userSchema, 'users');