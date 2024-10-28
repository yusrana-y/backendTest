require('dotenv').config()
const express = require('express')
const cors = require('cors')
const router = require('./routes/router')
require('./dbConnections/connection')

const uHServer = express()

uHServer.use(cors())
uHServer.use(express.json())

uHServer.use(router)

const PORT = 3000 || process.env.PORT

uHServer.listen(PORT,()=>{
    console.log(`UHServer running successfully at ${PORT} and waiting for client request`)
})

uHServer.get('/',(req,res)=>{
    res.status(200).send(`<h1 style="color:red;">UHServer started succesfully and waiting for client</h1>`)
})