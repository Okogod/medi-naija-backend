// Db Const
import conn from "../config/db_config.js";
import DB_CONST from "../db_const/db_const.js";

type RegistrationType = {
    patientid: string,
    firtsname: string,
    lastname: string,
    email: string, 
    password: string
}

// Register User
export const RegisterPatient = ( { patientid, firtsname, lastname, email, password}: RegistrationType ) => {

    let query;

    query = `INSERT INTO ${DB_CONST.patients_table} VALUES (?, ?, ?, ?, ?)`;

    const result = conn.query( query, [ patientid, firtsname, lastname, email, password ], ( error ) => {
        
        if( error ){
            
             return error;
        }

    } );

}