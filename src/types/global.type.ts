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