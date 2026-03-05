// Mysql Config
import conn from "../../config/db_config.js";

// Db Const
import DB_CONST from "../../db_const/db_const.js";


export const createPatientsTable = () => {

    let query;

    query = `CREATE TABLE IF NOT EXISTS ${DB_CONST.patients_table}(
    patientid VARCHAR(220) NOT NULL PRIMARY KEY,
    firstname VARCHAR(20) NOT NULL,
    lastname VARCHAR(20) NOT NULL,
    email VARCHAR(50) NOT NULL,
    password VARCHAR(220) NOT NULL
    )`

    conn.query( query, ( error ) => {

        if( error ){
            return console.log(error.message);
        }
    })

}

