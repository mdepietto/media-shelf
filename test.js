const express = require('express')
const mysql = require('mysql')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()
// app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())

var con = mysql.createConnection({
    host: 'database-1.cjgto2usdypj.us-east-2.rds.amazonaws.com',
    user: 'admin',
    password: '2vvDz&E*&sKua',
    database: 'media_shelf'
})

con.connect((err) => {
    if (err) throw err
    console.log('connected');
})

app.listen(3001, () => {
    console.log('port 3001');
})