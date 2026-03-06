import transpoerter from "../config/nodemailer_config.js";

// Type
import type { mailOptionType } from "../types/global.type.js";

const sendMail = ( mailOptions: mailOptionType) => {

    transpoerter.sendMail(mailOptions, ( error ) => {

        if (error) {

            return error.message;
            
        }    
        
        
    });
}

export default sendMail;