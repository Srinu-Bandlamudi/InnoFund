const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {JWT_KEY}=require('../config/serverConfig');
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    organization: {
      type: String,
      required: true
  },
  
    position: {
        type: String,
        required: true,
    }
}, { timestamps: true });


userSchema.pre('save', function(next) {
    const user = this;
    if (!user.isModified('password')) return next();
    const SALT=bcrypt.genSaltSync(9);
    const encryptedPassword = bcrypt.hashSync(user.password, SALT);
    user.password = encryptedPassword;
    next();
});

userSchema.methods.comparePassword = function compare(password) {
    return bcrypt.compareSync(password, this.password);
}

userSchema.methods.genJWT = function generate(){
    return jwt.sign({ _id: this._id, email: this.email, role: this.role }, JWT_KEY, {
        expiresIn: '1h'
    });
}

const User = mongoose.model('User', userSchema);

module.exports = User;
