import nodemailer from 'nodemailer';

const transpoerter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GOOGLE_APP_PASSWORD
    }
})

export default transpoerter;