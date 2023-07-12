const mysql = require('mysql2');

const globalPool = {
    write: false,
    read: false
};

const connectionPool = (credentials = {}, isWrite = false) => {

    if (isWrite && globalPool.write) {

        return globalPool.write;
    }
    else if (globalPool.read) {

        return globalPool.read;
    }

    const poolConnection = mysql.createPool(credentials);

    const poolPromise = poolConnection.promise();

    const connection = {
        escape: (value) => poolConnection.escape(value),
        query: async (query, ...params) => {

            try {

                const isUndefined = params.findIndex(param => param == undefined);

                if (isUndefined > -1) {

                    console.log(`QUERY PARAMS`, query, params);
                    throw new Error('Something went wrong. Please try again later');
                }

                let result;
                if (isWrite) {

                    [result] = await poolPromise.query(query, [...params]);
                }
                else {

                    [result] = await poolPromise.execute(query, [...params]);
                }

                return result;
            }
            catch (error) {

                // console.error(__line, error);
                throw error;
            }

        },
        getConnection: async () => {

            return new Promise((resolve, reject) => {
                poolConnection.getConnection((err, conn) => {
                    if (err) {
                        reject(err);
                    }
                    resolve(conn)
                });
            })
        }
    }

    if (isWrite) {

        globalPool.write = connection;
        return globalPool.write;
    }
    else {
        globalPool.read = connection;
        return globalPool.read;
    }
}

module.exports = () => {

    const DB_CREDENTIALS = {
        host: 'mushtak.tech',
        user: 'root',
        password: 'yash',
        database: 'car',
        waitForConnections: true,
        connectionLimit: 5,
        queueLimit: 0
    }

    global.writeDB = connectionPool(DB_CREDENTIALS, true);

    global.readDB = connectionPool(DB_CREDENTIALS);


}