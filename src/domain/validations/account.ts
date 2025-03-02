import { CreateProps, UpdateParams } from "../models/account";

export enum AccountRequiredError {
    NAME = 'Campo name deve ser preenchido'
}

export interface AccountValidation {
    create(params: CreateProps): void;
    update(params: UpdateParams): void;
}