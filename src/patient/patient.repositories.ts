// Crypto
import crypto from 'crypto';
import bcrypt from 'bcrypt';

// Db Const
import conn from "../config/db_config.js";
import DB_CONST from "../db_const/db_const.js";


// Types
import type { userRegistrationType } from "../types/global.type.js";
import type { ResultType } from "../types/global.type.js";

// Check if user exists
export const CheckIfUSerExists = (table: string, email: string) => {

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

// Register User
export const RegisterPatient = async ({ firstname, lastname, email, password }: userRegistrationType) => {

    try {

        let query;

        const salt = await crypto.randomBytes(16).toString('hex');

        const patientid = await crypto.scryptSync(email, salt, 64).toString('hex');

        const hashedPassword = await bcrypt.hash(password, 10);


        query = `INSERT INTO ${DB_CONST.patients_table} VALUES (?, ?, ?, ?, ?)`;

        conn.promise().query(query, [patientid, firstname, lastname, email, hashedPassword]);

    } catch (error: any) {

        return error.message;

    }

}