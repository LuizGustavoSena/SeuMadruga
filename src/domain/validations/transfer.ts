import { CreateTransfer } from "../models/transfer";

export enum TransferRequiredError {
    DESCRIPTION = 'Campo description deve ser preenchido',
    AMMOUNT = 'Campo ammount deve ser preenchido',
    ACC_ORI_ID = 'Campo acc_ori_id deve ser preenchido',
    ACC_DEST_ID = 'Campo acc_dest_id deve ser preenchido',
}

export enum TransferMessageError {
    ACC_ORI_ID_EQUAL_ACC_DEST_ID = 'acc_ori_id e acc_dest_id devem ter valores diferentes',
    ACC_ORI_ID_ANOTHER_USER = 'acc_ori_id não pertence a esse usuário',
    ACC_DEST_ID_ANOTHER_USER = 'acc_dest_id não pertence a esse usuário',
    ID = 'Valor de parametro deve ser um number',
}

export interface TransferValidation {
    create(params: CreateTransfer): void;
    id(id: number): void;
}