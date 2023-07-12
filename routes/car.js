const ROUTER = require('express').Router();


ROUTER.post('/add-car', async (req, res, next) => {

    try {

        // const result  = req.query.countryCode;
        // console.log('data', req)
        if (!req.body.email) {

            return res.send({ message: 'Enter email id', status: true })

        }
        else  if (!req.body.password) {

            return res.send({ message: 'Enter password', status: true })

        }

        const query = `INSERT INTO user (email, password) VALUES ('${req.body.email}', '${req.body.password}')`

        const result = await writeDB.query(query)

        return res.send(result)



        // return res.send({ data: 'hello' })

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



ROUTER.post('/car-detail', async (req, res, next) => {

    console.log('data')
    try {

        // const result  = req.query.countryCode;
        // console.log('data', req)
        if (!req.body.email) {

            return res.send({ message: 'Enter email id', status: true })

        }
        else  if (!req.body.password) {

            return res.send({ message: 'Enter password', status: true })

        }

        const query = `SELECT email, password FROM user WHERE email = '${req.body.email}'AND password = '${req.body.password}'`

        const result = await writeDB.query(query)



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