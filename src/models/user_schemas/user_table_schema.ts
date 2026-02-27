import DB_CONST from "../../db_const/db_const.js";

import conn from "../../config/db_config.js";

const userTableSchema = () => {

    let query;

    query = `CREATE TABLE IF NOT EXISTS ${DB_CONST.user_table} (
        userid VARCHAR(220) NOT NULL PRIMARY KEY,
        firstname VARCHAR(20) NOT NULL,
        lastname VARCHAR(20) NOT NULL,
        email VARCHAR(50) UNIQUE NOT NULL,
        password VARCHAR(220) NOT NULL
    )`;

    conn.query(query, (err, result) => {
        if (err) {
            console.log(`Error creating ${DB_CONST.user_table} table:`, err);
        } 
    });


}

export default userTableSchema;