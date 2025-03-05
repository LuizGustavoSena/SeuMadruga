import { CreateTransfer } from "../models/transfer";

export enum TransferRequiredError {
    DESCRIPTION = 'Campo description deve ser preenchido',
    AMMOUNT = 'Campo ammount deve ser preenchido',
    ACC_ORI_ID = 'Campo acc_ori_id deve ser preenchido',
    ACC_DEST_ID = 'Campo acc_dest_id deve ser preenchido',
}

export enum TransferMessageError {
    ACC_ORI_ID_EQUAL_ACC_DEST_ID = 'acc_ori_id e acc_dest_id devem ter valores diferentes'
}

export interface TransferValidation {
    create(params: CreateTransfer): void;
}