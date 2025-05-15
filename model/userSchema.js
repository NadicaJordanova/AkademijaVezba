const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')


const userSchema = new mongoose.Schema({
    ime:{
        type: String,
        required: [true,  "Ime required"]
    },
    age: {
        type: String,
        required: [true,  "Age required"]
    },
    email:{
        type: String,
        required: [true, "Email required"]
    },
    password:{
        type: String,
        required: [true,  "Password required"],
        
    },

})


userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 12);
    next();
  });

const User = mongoose.model('User', userSchema)

module.exports = User