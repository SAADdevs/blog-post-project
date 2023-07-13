const user = require('../models/user')
const { StatusCodes } = require('http-status-codes');

const register = async (req,res)=>{
  const User = await user.create({...req.body})
  const token = User.createJWT()
  res.status(StatusCodes.CREATED).json({ user: { name: User.name }, token })
}

const login = async (req,res) => {
    const { email,password } = req.body

// checking are email and password empty 
if (!email || !password) {
  return res.status(StatusCodes.BAD_REQUEST).json({msg: 'provide the email and password'})
}

    //checking if email exist on DB
    const User = await user.findOne({email})
    if (!User)
    {
      return res.status(StatusCodes.UNAUTHORIZED).json({msg: 'the email is not correct'})
    }

    // checking if current password match the password on DB
    const isMatchPassword = await User.comparePassword(password)
    if(!isMatchPassword)
    {
      return res.status(StatusCodes.UNAUTHORIZED).json({msg:'the password is not correct'})
    }

   const token = User.createJWT()

   res.status(StatusCodes.OK).json({user: { name: User.name }, token})
}
module.exports = {
    login,
    register
}