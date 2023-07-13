const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    name: {
        type:String,
        required: [true,'please provide the name '],
        maxlength: 50
    },
    email: {
        type:String,
        required: [true,'please provide email '],
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Please provide a valid email',
          ],
          unique: true,
    },
    password: {
        type:String,
        required: [true,'please provid the password'],
        minlength: 6,
    }
})

userSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password,salt)
    next()
})

userSchema.methods.createJWT = function () {
   return jwt.sign(
    {userId: this._id,name:this.name}
    ,'jwtSecret',{expiresIn: '30d'}
   )
}

userSchema.methods.comparePassword = async function (userPassword){
    const isMatch = await bcrypt.compare(userPassword,this.password)
    return isMatch
}



module.exports = mongoose.model('user',userSchema)