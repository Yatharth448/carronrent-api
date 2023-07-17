
const send = require('../components/Auth/SendEmail').default
console.log(send, 'send')
const ROUTER = require('express').Router();
const jwt = require('jsonwebtoken');

ROUTER.post('/register', async (req, res, next) => {

    try {

        // const result  = req.query.countryCode;
        // console.log('data', req)
        if (!req.body.email) {

            return res.send({ message: 'Enter email id', status: true })

        }

        const query1 = `SELECT email FROM user WHERE email = '${req.body.email}'`
        const result1 = await readDB.query(query1)


        console.log(result1, req.body.email, 'data')
        if (result1.length) {



            // console.log(result1, req.body.email,  'data')
            // const authRes = await Auth(req.body.email)


            // console.log(authRes, 'auth response')


        }
        else {

            var otp = Math.floor(1000 + Math.random() * 9000);
            // console.log(val);


            var token = jwt.sign({ 'email': req.body.email, 'otp': otp }, 'shhhhh');

            // const authRes = await send('yatharth448@gmail.com')


            console.log(token, otp, 'auth response')

        }
        return res.send({message:'Otp sent successfully', secret: token, status: true})

        // if()

        //   if (!req.body.password) {

        //     return res.send({ message: 'Enter password', status: true })

        // }

        // const query = `INSERT INTO user (email, password) VALUES ('${req.body.email}', '${req.body.password}')`

        // const result = await writeDB.query(query)

        // return res.send(result1)



        // return res.send({ data: 'hello' })

        // res.send(result);
    }
    catch (error) {

        console.error(error, 'error');
        res.send({
            success: false,
            error: error.message || error
        });
    }
})



ROUTER.post('/login', async (req, res, next) => {

    console.log('data')
    try {

        // const result  = req.query.countryCode;
        // console.log('data', req)
        if (!req.body.email) {

            return res.send({ message: 'Enter email id', status: true })

        }
        else if (!req.body.password) {

            return res.send({ message: 'Enter password', status: true })

        }

        const query = `SELECT email, password FROM user WHERE email = '${req.body.email}'AND password = '${req.body.password}'`

        const result = await readDB.query(query)



        return res.send({ data: result })

        // res.send(result);
    }
    catch (error) {

        console.error(error);
        res.send({
            success: false,
            error: error.message || error
        });
    }
})

module.exports = ROUTER