// Crypto
import crypto from 'crypto';
import bcrypt from 'bcrypt';

// Db Const
import conn from "../config/db_config.js";
import DB_CONST from "../db_const/db_const.js";


// Types
import type { userRegistrationType } from "../types/global.type.js";
import type { ResultType } from "../types/global.type.js";
import type { QueryResult } from 'mysql2';

// Check If Patient Exists
export const CheckIfPatientExists = (table: string, email: string) => {

    return new Promise((resolve, reject) => {

        let query;

        query = `SELECT * FROM ${table} WHERE email = ? LIMIT 1`;

        conn.query<ResultType[]>(query, [email], (error, result) => {

            if (error) {

                reject(error);

            }

            if (result.length > 0) {

                resolve(true);

            }

            resolve(false);

        })

    });



}

// Register Patient
export const RegisterPatient = async ({ firstname, lastname, email, password }: userRegistrationType) => {

    try {

        let query;

        const salt = await crypto.randomBytes(16).toString('hex');

        const patientid = await crypto.scryptSync(email, salt, 64).toString('hex');

        const hashedPassword = await bcrypt.hash(password, 10);


        query = `INSERT INTO ${DB_CONST.patients_table} VALUES (?, ?, ?, ?, ?)`;

        conn.promise().query(query, [patientid, firstname.toLowerCase(), lastname.toLowerCase(), email.toLowerCase(), hashedPassword]);

    } catch (error: any) {

        return error.message;

    }

}

// Login Patient
export const LoginPatient = async (email: string, password: string) => {


    try {

        let query;

        query = `SELECT * FROM ${DB_CONST.patients_table} WHERE email = ? LIMIT 1`;

        const [ row, field]: any = await conn.promise().query(query, [email]);

        if (row.length === 0) {
            return [];
        }

        const comparedPassword = await bcrypt.compare(password, row[0].password);

        if (!comparedPassword) {
            return [];
        }

        return (row);

    } catch (error: any) {

        return error;

    }


}

// Reset Password
export const ResetPassword = async ( email: string, newPassword: string ) => {

    try{

        let query;

        const hashedNewPassword = await bcrypt.hash(newPassword, 10);

        query = `UPDATE ${DB_CONST.patients_table} SET password = ? WHERE email = ?`;

        const [ row ] = await conn.promise().query(query, [hashedNewPassword, email]);

        return row;

    }catch( error: any ){

        throw new Error( error );
    }

}