import transpoerter from "../config/nodemailer_config.js";

// Type
import type { mailOptionType } from "../types/mail_options_type.js";

const sendMail = ( mailOptions: mailOptionType) => {
    transpoerter.sendMail(mailOptions, (error, info) => {

        if (error) {
            return error.message;
        } 
        
    });
}

export default sendMail;