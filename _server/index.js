const express = require('express')
const mongoose = require('mongoose')
const authRouter = require('./authRouter')
const usersRouter = require('./usersRouter')
const PORT = process.env.PORT || 5000
const cors = require('cors')
const corsOptions ={
    origin:'http://localhost:3000',
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}

const app = express()

app.use(cors(corsOptions))
app.use(express.json())
app.use('/auth', authRouter)
app.use('/users', usersRouter)

const start = async () => {
    try{
        await mongoose.connect('mongodb+srv://yehor:0028@cluster0.n4twl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
        app.listen(PORT, () => console.log(`server started on port ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}

start()