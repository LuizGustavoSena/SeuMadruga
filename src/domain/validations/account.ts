import { CreateProps, UpdateParams } from "../models/account";

export enum AccountRequiredError {
    NAME = 'Campo name deve ser preenchido'
}

export enum AccountMessageError {
    ANOTHER_USERS_ACCOUNT = 'Essa conta não pertence a esse usuário',
    ID = 'Valor de parametro deve ser um number'
}

export interface AccountValidation {
    create(params: CreateProps): void;
    update(params: UpdateParams): void;
    id(id: number): void;
}