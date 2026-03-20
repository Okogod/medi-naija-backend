// Send Mail
import sendMail from "../utils/send_mail.js";

// Genrate Code
import generateFourDigitCode from "../utils/generate_four_digit_code.js";

// Redis
import redisClient from "../config/redis_config.js";

// Types
import type { SendRegistrationCodeType } from "../types/global.type.js";


export const SendRegistrationCodeService = ({ firstname, lastname, email, password }: SendRegistrationCodeType) => {

    const code = generateFourDigitCode();

    sendMail({
        from: 'Medi-Naija',
        to: `${email}`,
        subject: 'Verify Your Email to Complete Registration',
        html: `
                    <!DOCTYPE html>
            <html>
            <head>
            <meta charset="UTF-8">
            <title>Verification Code</title>
            <style>
                body {
                font-family: Arial, sans-serif;
                background-color: #f6f9fc;
                margin: 0;
                padding: 0;
                }
                .container {
                max-width: 600px;
                margin: 40px auto;
                background: #ffffff;
                border-radius: 8px;
                padding: 30px;
                box-shadow: 0 4px 8px rgba(0,0,0,0.05);
                }
                h2 {
                color: #333333;
                }
                p {
                color: #555555;
                line-height: 1.6;
                }
                .code-box {
                margin: 20px 0;
                padding: 15px;
                background-color: #0078d7;
                color: #ffffff;
                font-size: 24px;
                font-weight: bold;
                text-align: center;
                border-radius: 6px;
                letter-spacing: 4px;
                }
                .footer {
                margin-top: 30px;
                font-size: 12px;
                color: #999999;
                text-align: center;
                }
            </style>
            </head>
            <body>
            <div class="container">
                <h2>Your Verification Code</h2>
                <p>Hello ${firstname} ${lastname},</p>
                <p>Thank you for registering with <strong>Medi-Naija</strong>! 
                To complete your registration, please enter the code below:</p>
                
                <div class="code-box">${code}</div>
                
                <p>This code will expire in <strong>10 minutes</strong>.</p>
                <p>If you didn’t request this, you can safely ignore this email.</p>
                
                <div class="footer">
                <p>Best regards,<br>The Medi-Naija Team</p>
                </div>
            </div>
            </body>
            </html>
        `
    })

    redisClient
        .hSet(`Verify:${email}`, { firstname, lastname, email, password, code })
        .catch((err) => {
            return err;
        });

}

export const VerifyRegistrationCodeService = (email: string, code: string) => {

    return new Promise((resolve, reject) => {

        redisClient.hGetAll(`Verify:${email}`)
            .then((result) => {


                if (!result) {

                    reject('Invalid Registration Code');

                }

                if (result.code !== code) {

                    reject('Invalid Registration Code');

                }

                resolve(result);


            })
            .catch((error) => {

                reject(error);

            })

    })



}

export const ResendRegistrationCodeService = (email: string) => {

    return new Promise((resolve, reject) => {

        redisClient.hGetAll(`Verify:${email}`)
            .then((data) => {

                if (!data) {

                    reject('No registration code found for this email');

                }

                SendRegistrationCodeService({
                    firstname: data.firstname,
                    lastname: data.lastname,
                    email: data.email,
                    password: data.password
                });

                resolve('Registration code resent successfully');
            })
            .catch((error) => {
                reject(error);
            })

    })

}

export const ResendForgotPasswordCodeService = (email: string) => {

    return new Promise((resolve, reject) => {

        redisClient.hGetAll(`Verify:${email}`)
            .then((data) => {

                if (!data) {

                    reject('No registration code found for this email');

                }

                SendForgotPasswordCodeService( email );

                resolve('Registration code resent successfully');
            })
            .catch((error) => {
                reject(error);
            })

    })

}

export const SendForgotPasswordCodeService = (email: string) => {

    const code = generateFourDigitCode();

    sendMail({
        from: 'Medi-Naija',
        to: `${email}`,
        subject: 'Reset Your Password  Verification Code',
        html: `
                    <!DOCTYPE html>
            <html>
            <head>
            <meta charset="UTF-8">
            <title>Verification Code</title>
            <style>
                body {
                font-family: Arial, sans-serif;
                background-color: #f6f9fc;
                margin: 0;
                padding: 0;
                }
                .container {
                max-width: 600px;
                margin: 40px auto;
                background: #ffffff;
                border-radius: 8px;
                padding: 30px;
                box-shadow: 0 4px 8px rgba(0,0,0,0.05);
                }
                h2 {
                color: #333333;
                }
                p {
                color: #555555;
                line-height: 1.6;
                }
                .code-box {
                margin: 20px 0;
                padding: 15px;
                background-color: #0078d7;
                color: #ffffff;
                font-size: 24px;
                font-weight: bold;
                text-align: center;
                border-radius: 6px;
                letter-spacing: 4px;
                }
                .footer {
                margin-top: 30px;
                font-size: 12px;
                color: #999999;
                text-align: center;
                }
            </style>
            </head>
            <body>
            <div class="container">
                <h2>Your Verification Code</h2>
                <p>Hello,</p>
                <p>We received a request to reset your password for <strong>Medi-Naija</strong>! 
                To proceed, please enter the code below:</p>
                
                <div class="code-box">${code}</div>
                
                <p>This code will expire in <strong>10 minutes</strong>.</p>
                <p>If you didn’t request this, you can safely ignore this email.</p>
                
                <div class="footer">
                <p>Best regards,<br>The Medi-Naija Team</p>
                </div>
            </div>
            </body>
            </html>
        `
    })

    redisClient
        .hSet(`ForgotPassword:${email}`, { code })
        .catch((err) => {
            return err;
        });

}


export const VerifyForgotPasswordCodeService = (email: string, code: string) => {

    return new Promise((resolve, reject) => {

        redisClient.hGetAll(`ForgotPassword:${email}`)
            .then((result) => {

                if (!result) {

                    reject('Invalid Forgot Password Code');

                }

                if (result.code !== code) {

                    reject('Invalid Forgot Password Code');

                }

                resolve(result);


            })
            .catch((error) => {

                reject(error);

            })

    })



}
