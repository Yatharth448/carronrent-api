
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
        if (!result1.length) {
            
            const query = `INSERT INTO user (email, status, type) VALUES ('${req.body.email}','${0}','${0}')`
            const result = await writeDB.query(query)


            var otp = Math.floor(1000 + Math.random() * 9000);
            // console.log(val);
            String(otp)


            var token = jwt.sign({ 'email': req.body.email, 'otp': otp }, 'shhhhh');

            const authRes = await send('Email confirmation',req.body.email,'KARYANA email verify' ,otp)


            console.log(token, otp, 'auth response')
            
            return res.send({token:token, status: true})

        }
        else {

            const query = `UPDATE user SET password = '${req.body.password}', status = '${1}' WHERE email = '${req.body.email}'`

            const result = await writeDB.query(query)

            if(result)
            {
                return res.send({date:result, status: true, message: 'User registered successfull'})
            }
           
        }
       
    }
    catch (error) {

        console.error(error, 'error');
        res.send({
            success: false,
            error: error.message || error
        });
    }
})


ROUTER.post('/verifyOTP', async (req, res, next) => {

    try {

        // const result  = req.query.countryCode;
        // console.log('data', req)
        if (!req.body.otp) {

            return res.send({ message: 'Invalid OTP', status: true })

        }



        var decoded = jwt.verify(req.body.token, 'shhhhh');
        console.log(decoded.otp, req.body.otp , 'otps')
       if(String(decoded.otp) === String(req.body.otp))
       {
        return res.send({ message: 'OTP Verified Successfully', status: true })
       }

        //jwt.sign({ 'email': req.body.email, 'otp': otp }, 'shhhhh');



        // const query1 = `SELECT email FROM user WHERE email = '${req.body.email}'`
        // const result1 = await readDB.query(query1)


        // console.log(result1, req.body.email, 'data')
        // if (result1.length) {



            // console.log(result1, req.body.email,  'data')
            // const authRes = await Auth(req.body.email)


            // console.log(authRes, 'auth response')


        // }
        return res.send({data:[], status: true})

       
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