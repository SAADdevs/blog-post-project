const express = require('express')
const routes = express.Router()

const {getComment , creatComment,updateComment,deleteComment } = require('../controllers/comments')

routes.route('/').post(creatComment)
routes.route('/:id').get(getComment).delete(deleteComment).patch(updateComment)

module.exports = routes


