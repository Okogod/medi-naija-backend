import crypto from 'crypto';

const generateFourDigitCode = () => {

    return    crypto.randomInt( 1000, 9999).toFixed();

}

export default generateFourDigitCode;