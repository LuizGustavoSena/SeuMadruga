import { UserProps } from "../models/user";

export enum UserRequiredError {
    NAME = 'Campo name deve ser preenchido',
    EMAIL = 'Campo email deve ser preenchido',
    PASSWORD = 'Campo password deve ser preenchido',
}

export enum UserMessageError {
    EMAIL = 'Campo email deve ser do tipo email',
    PASSWORD = 'Campo password deve conter no mínimo 5 caracteres',
}

export interface UserValidation {
    create(params: UserProps): void;
}