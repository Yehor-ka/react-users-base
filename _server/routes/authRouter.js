const Router = require('express')
const router = new Router()
const controller = require('../authController')
const {check} = require('express-validator')
const authMiddleware = require('../middleware/auth.middleware')

router.post('/authorization',[
    check('username', 'Имя пользователя не может быть пустым').notEmpty(),
    check('email', 'Не верно указан email').isEmail(),
    check('password', 'Пароль должен быть больше 3 символов').isLength({min: 4})
], controller.registration)
router.post('/login', controller.login)
router.get('/auth', authMiddleware, controller.auth)

module.exports = router