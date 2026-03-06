// Send Mail
import sendMail from "../utils/send_mail.js";

// Genrate Code
import generateFourDigitCode from "../utils/generate_four_digit_code.js";

// Redis
import redisClient from "../config/redis_config.js";


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
        .then(() => {
            console.log(`Verification code stored in Redis for ${email}`);
            redisClient.expire(`Verify:${email}`, 60 * 10); // Set expiration time to 10 minutes (600 seconds)
        })
        .catch((err) => {
            return err;
        });

}