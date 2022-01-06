const Router = require('express')
const usersRouter = new Router()
const controller = require('./authController')

usersRouter.get('/users', controller.getUsers)
usersRouter.delete('/delete/:id', controller.delete)
usersRouter.put('/update/:id', controller.update)

module.exports = usersRouter