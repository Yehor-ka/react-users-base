const express = require('express')
const mongoose = require('mongoose')
const authRouter = require('./routes/authRouter')
const usersRouter = require('./routes/usersRouter')
const config = require('./config/default.json')
const PORT = process.env.PORT || config.serverPort
const cors = require('cors')
const corsOptions ={
    origin:'http://localhost:3000',
    credentials:true,            
    optionSuccessStatus:200
}

const app = express()

app.use(cors(corsOptions))
app.use(express.json())
app.use('/auth', authRouter)
app.use('/users', usersRouter)

const start = async () => {
    try{
        await mongoose.connect(config.mongodbPath)
        app.listen(PORT, () => console.log(`server started on port ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}

start()