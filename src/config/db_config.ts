import  { type Connection, createConnection } from 'mysql2';

import dotenv from 'dotenv';

dotenv.config();

// Db_Const
import DB_CONST from '../db_const/db_const.js';

let query;


// Connecting To Database
const conn: Connection = createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
})


// Checking Database Connection
conn.connect( ( error ) => {

    if( error ){
        return console.log(`SERVER CONNECTION ERROR: ${error}`);
    }

})


// Creating Database
query = `CREATE DATABASE IF NOT EXISTS ${DB_CONST.db_name}`;

conn.query( query, ( error ) => {

    if( error ){
        return console.log(`SERVER CREATING DATABASE ERROR: ${error}`);
    }

})


// Using Database
query = `USE ${DB_CONST.db_name}`;

conn.query( query, ( error ) => {

    if( error ){
        return console.log(`SERVER USING ${DB_CONST.db_name} ERROR: ${error}`);
    }

})

export default conn;