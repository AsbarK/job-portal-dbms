import mysql from 'mysql2'
import dotenv from 'dotenv'
dotenv.config({path:'.env.local' })

const db = mysql.createConnection({
    user:'freedb_asbar',
    // user:'root',
    host:String(process.env.HOST),
    password:String(process.env.PASSWORD),
    database:'freedb_jobPortal',
});

export default db