const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
require('dotenv').config()
require('./db.js')
const todoRouter = require('./routes/TodoRoutes.js')
const port = process.env.PORT || 8001


const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use('/todos',todoRouter)


app.get('/',(req, res)=>{
    res.json({
        message: 'Welcome to the APP'
    })
})

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
})
