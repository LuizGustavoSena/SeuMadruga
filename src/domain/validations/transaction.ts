import { CreateProps } from "../models/transaction";

export enum TransactionRequiredError {
    AMMOUNT = 'Campo ammount deve ser preenchido',
    DESCRIPTION = 'Campo description deve ser preenchido',
    ACC_ID = 'Campo acc_id deve ser preenchido',
    TYPE = 'Campo type deve ser preenchido',
}

export enum TransactionMessageError {
    POSITIVE_AMMOUNT = 'Campo ammount deve ser positivo',
    NEGATIVE_AMMOUNT = 'Campo ammount deve ser negativo',
    TYPE = 'Campo type inválido'
}

export interface TransactionValidation {
    create(params: CreateProps): void;
}