import { SigninParams } from "../models/auth";

export enum AuthRequiredError {
    EMAIL = 'Campo email deve ser preenchido',
    PASSWORD = 'Campo password deve ser preenchido'
}

export enum AuthMessageError {
    EMAIL = 'Campo email deve ser do tipo email',
    PASSWORD = 'Campo password deve conter no mínimo 5 caracteres'
}

export interface AuthValidation {
    signin(params: SigninParams): void;
}   