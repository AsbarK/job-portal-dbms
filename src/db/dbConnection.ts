import mysql from 'mysql2'

const db = mysql.createConnection({
    user:'root',
    host:'localhost',
    password:'3#asbarKK',
    database:'jobPortal',
});

export default db