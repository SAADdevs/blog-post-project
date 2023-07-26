
require('dotenv').config()
require('express-async-errors');

const express = require('express')
const app = express()

//routes
const authRouter = require('./routes/auth')
const blogsRouter = require('./routes/blog')
const auth =  require('./middlware/authentication')


//midlware
const errorHandlerMiddleware = require('./middlware/error-handler')
const notFound = require('./middlware/not-found')

//db
const connectDb = require('./Db/connect')

// midlware
app.use(express.json())
app.use(express.static('./public'))
app.use('/api/v1/auth',authRouter)
app.use('/api/v1/blog',auth,blogsRouter)


app.use(errorHandlerMiddleware)
app.use(notFound)



const PORT = process.env.PORT || 5000

const start = async () => {
    try {
        await connectDb(process.env.MONGO_URI)
        app.listen(PORT, console.log(`the server is listing on port ${PORT}`))
    } catch (error) {
        console.log(error);
    }
}

start()


