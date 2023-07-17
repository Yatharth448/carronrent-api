const express = require('express');

const router = require('./routes/index.js');
require('./storage.js')()
const app = express()
var cors = require('cors')
app.use(cors())
const port = 2100
app.use(express.json())
// const register = require('./routes/register')
app.use(router.register);
app.get('/', (req, res) => {
    res.send('Hello World2!')
})

app.get('/user', async(req,res) => {
    const users = await readDB.query('select * from user');
    return res.send(users)
})

app.get('/useraddress', (req, res) => {
    res.send('getting user address')
})

// app.use('/register', register)
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
