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
    TYPE = 'Campo type inválido',
    ID = 'Valor de parametro deve ser um number',
    ANOTHER_ACCOUNT_TRANSACTION = 'Essa transação não pertence a essa conta',
}

export interface TransactionValidation {
    create(params: CreateProps): void;
    id(id: number): void;
}