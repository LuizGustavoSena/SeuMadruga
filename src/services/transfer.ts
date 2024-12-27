import { TransactionProps, Type } from '@src/domain/models/transaction';
import { CreateTransfer, CreateTransferResponse, insertTransactionsProps, TransferProps, UpdateTransferProps, UpdateTransferResponse } from '@src/domain/models/transfer';
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

        await this.insertTransactions({
            acc_dest_id: transfer.acc_dest_id,
            acc_ori_id: transfer.acc_ori_id,
            ammount: transfer.ammount,
            date: transfer.date,
            id: transfer.id
        });

        return response[0];
    }

    async update(params: UpdateTransferProps): Promise<UpdateTransferResponse> {
        const response = await db(this.tableName)
            .where({ id: params.id })
            .update(params.data, '*');

        const transfer = response[0] as TransferProps;

        await this.deleteTransactionsByTransferId(transfer.id);

        await this.insertTransactions({
            acc_dest_id: transfer.acc_dest_id,
            acc_ori_id: transfer.acc_ori_id,
            ammount: transfer.ammount,
            date: transfer.date,
            id: transfer.id
        });

        return transfer;
    }

    async deleteById(id: number): Promise<void> {
        await this.deleteTransactionsByTransferId(id);

        await db(this.tableName)
            .where({ id })
            .del();
    }

    private async insertTransactions(params: insertTransactionsProps): Promise<void> {
        const transactions: TransactionProps[] = [
            {
                description: `Transfer to account_id: ${params.acc_dest_id}`,
                acc_id: params.acc_ori_id,
                ammount: params.ammount * -1,
                date: params.date,
                type: Type.OUTPUT,
                transfer_id: params.id
            },
            {
                description: `Transfer from account_id: ${params.acc_ori_id}`,
                acc_id: params.acc_dest_id,
                ammount: params.ammount,
                date: params.date,
                type: Type.INPUT,
                transfer_id: params.id
            }
        ]

        await db(this.transactionTable).insert(transactions);
    }

    private async deleteTransactionsByTransferId(id: number): Promise<void> {
        await db(this.transactionTable)
            .where({ transfer_id: id })
            .del();
    }
}