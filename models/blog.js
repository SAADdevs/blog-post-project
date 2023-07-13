const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
   title: {
    type:String,
    required: [true, 'please provide the type'],
    maxlength: 55 ,
    minlength: 8
   },
   content:{
    type:String,
    required:[true,'please provide the content'],
    minlength: 20
   },
   createdBy: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: [true, 'Please provide user'],
  },
},
{ timestamps: true }
)

module.exports = mongoose.model('blog',blogSchema)