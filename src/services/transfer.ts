import { TransferProps } from '@src/domain/models/transfer';
import knex from 'knex';
import config from "../../knexfile";

const db = knex(config);

export default class TransferService {
    tableName = 'transfers';

    constructor() { }

    async find(filters: Partial<TransferProps>): Promise<any> {
        const response = await db(this.tableName)
            .where(filters)
            .select();

        return response;
    }
}