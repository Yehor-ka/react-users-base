const User = require('./models/User')
const Role = require('./models/Role')
const bcrypt = require('bcryptjs')
const { validationResult } = require('express-validator')
const jwt = require('jsonwebtoken');
const config = require('./config/default.json')


const generateAccessToken = (id, roles) => {
    const payload = {
        id,
        roles
    }
    return jwt.sign(payload, config.secret, {expiresIn: "24h"})
}

class authController {
    async registration(req, res) {
        try{
            const errors = validationResult(req)
            if(!errors.isEmpty()) {
                return res.json({message: "Ошибка при регистрации", errors})
            }
            const {username, email, password} = req.body
            const candidate = await User.findOne({email})
            if(candidate) {
                return res.json({message: "Пользователь с таким email уже существует"})
            }
            const hashPass = bcrypt.hashSync(password, 7);
            const userRole = await Role.findOne({value: "USER"})
            const user = new User({username, email, password: hashPass, roles: [userRole.value]})
            await user.save()
            return res.json({message: "Пользователь был успешно зарегистрирован"})
        } catch (e) {
            console.log(e)
            res.json({message: 'Registration error'})
        }
    }

    async login(req, res) {
        try{
            const {email, password} = req.body
            const user = await User.findOne({email})
            if(!user) {
                return res.json({message: "Пользователь не найден"})
            }
            const validPassword = bcrypt.compareSync(password, user.password)
            if(!validPassword) {
                return res.json({message: "Введен неверный пароль"})
            }
            const token = generateAccessToken(user._id, user.roles)
            return res.json({token, user})
        } catch (e) {
            console.log(e)
            res.json({message: 'Login error'})
        }
    }

    async getUsers(req, res) {
        try{
            const users = await User.find()
            res.json(users)
        } catch (e) {
            console.log(e)
        }
    }

    async auth(req, res) {
        try{
            const user = await User.findOne({_id: req.user.id})
            const token = generateAccessToken(user._id, user.roles)
            return res.json({token, user})
        } catch (e) {
            console.log(e)
            res.json({message: 'Server error'})
        }
    }
    
    async delete(req, res) {
        try{
            const condition = {_id: req.params.id}
            const deletedUser = await User.findByIdAndDelete(condition)
            return res.json(deletedUser)
        } catch (e) {
            console.log(e)
            res.json({message: 'Delete error'})
        }
    }

    async update(req, res) {
        try{
            const id = {_id: req.params.id}
            const body = req.body
            const updatedUser = await User.updateOne(id,{$set: body})
            return res.json(updatedUser)
        } catch (e) {
            console.log(e)
            res.json({message: 'Update error'})
        }
    }
}

module.exports = new authController()
