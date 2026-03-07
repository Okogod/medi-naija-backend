// Types
import type { RowDataPacket } from "mysql2";



export type ResultType = RowDataPacket & {
    patientid: string,
    firstname: string,
    lastname: string,
    email: string,
    password: string
}

// Send Registration Code Type
export type SendRegistrationCodeType = {
    firstname: string,
    lastname: string,
    email: string,
    password: string
}

// Mail Option Type
export type mailOptionType = {
    from: string;
    to: string;
    subject: string;
    text?: string;
    html?: string;
}

// User Registration Type
export type userRegistrationType = {
    firstname: string,
    lastname: string,
    email: string, 
    password: string
}

// Verify Registration Code Request Type
export type verifyRegistrationCodeRequestType = {
    firstname: string,
    lastname: string,
    password: string,
    email: string,
    code?: string
}