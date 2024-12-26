import { TransactionProps, Type } from '@src/domain/models/transaction';
import { CreateTransfer, CreateTransferResponse, TransferProps } from '@src/domain/models/transfer';
import knex from 'knex';
import config from "../../knexfile";

const db = knex(config);

export default class TransferService {
    private readonly tableName = 'transfers';
    private readonly transactionTable = 'transactions';

    constructor() { }

    async find(filters: Partial<TransferProps>): Promise<TransferProps[]> {
        const response = await db(this.tableName)
            .where(filters)
            .select();

        return response;
    }

    async create(params: CreateTransfer): Promise<CreateTransferResponse> {
        const response = await db(this.tableName)
            .insert({ ...params, date: new Date() }, '*');

        const transfer = response[0] as TransferProps;

        const transactions: TransactionProps[] = [
            {
                description: `Transfer to account_id: ${transfer.acc_dest_id}`,
                acc_id: transfer.acc_ori_id,
                ammount: transfer.ammount * -1,
                date: transfer.date,
                type: Type.OUTPUT,
                transfer_id: transfer.id
            },
            {
                description: `Transfer from account_id: ${transfer.acc_ori_id}`,
                acc_id: transfer.acc_dest_id,
                ammount: transfer.ammount,
                date: transfer.date,
                type: Type.INPUT,
                transfer_id: transfer.id
            }
        ]

        await db(this.transactionTable).insert(transactions);

        return response[0];
    }
}