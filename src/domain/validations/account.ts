import { CreateProps } from "../models/account";

export enum AccountRequiredError {
    NAME = 'Campo name deve ser preenchido'
}

export interface AccountValidation {
    createOrUpdateAccount(oarams: CreateProps): void;
}