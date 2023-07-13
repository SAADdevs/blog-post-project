const express = require ('express')
const routes = express.Router()

const {getAllBlogs,
getBlog,
creatBlog,
updateBlog,
deletBlog 
} = require('../controllers/blog')


routes.route('/').get(getAllBlogs).post(creatBlog)
routes.route('/:id').get(getBlog).patch(updateBlog).delete(deletBlog)

module.exports = routes