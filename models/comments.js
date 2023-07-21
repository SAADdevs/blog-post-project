const mongoose = require('mongoose')

const commentSchema = mongoose.Schema({
    content:{
        type:String,
        required:[true,'provide the content please'],
        minLength: 20
    },
    BlopPostID: {
        type: mongoose.Types.ObjectId,
        ref: 'blog',
        required: [true, 'Please provide user'],
      },
      commentersID: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: [true, 'Please provide user'],
      },
},
{ timestamps: true }
)

module.exports = mongoose.model('comment',commentSchema)