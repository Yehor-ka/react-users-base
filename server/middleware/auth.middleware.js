const jwt = require('jsonwebtoken')
const {secret} = require('../config')

module.exports = (req, res, next) => {
    if(req.method === "OPTIONS") {
        next()
    }
    
    try {
        const token = req.headers.authorization.split(' ')[1]
        if(!token) {
            console.log('Error1')
            return res.status(401).json({message: "Auth error"})
        }
        const decoded = jwt.verify(token, secret)
        req.user = decoded
        next()
    } catch (e) {
        console.log('Error2')
        return res.status(401).json({message: "Auth error"})
    }
    
}
