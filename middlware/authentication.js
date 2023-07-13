const jwt = require('jsonwebtoken')
const { StatusCodes } = require('http-status-codes');


const auth = async (req,res,next)=>{
     const authHeader = req.headers.authorization

     if(!authHeader || !authHeader.startsWith('Bearer'))
     {
          return res.StatusCodes(StatusCodes.UNAUTHORIZED).json({msg:"invalid authentication "})
     }

     const token = await authHeader.split(' ')[1]

     try {
          const playload = jwt.verify(token,'jwtSecret')
          req.user = {userId: playload.userId,name: playload.name}
          next()
     } catch (error) {
          return res.status(StatusCodes.UNAUTHORIZED).json({msg:"invalid authentication "})         
     }

}

module.exports = auth