const jwt = require('jsonwebtoken')
const config = require('../config/default.json')

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
        const decoded = jwt.verify(token, config.secret)
        req.user = decoded
        next()
    } catch (e) {
        console.log('Error2')
        return res.status(401).json({message: "Auth error"})
    }
    
}
