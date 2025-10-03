export type User = {
    email : string;
    displayName : string;
    id : string;
    token : string;
    imageUrl? : string;
}

export type LoginCreds = {
    email : string;
    password : string;
}
export type RegisterCreds = {
    email : string;
    displayName : string;
    password : string;
}