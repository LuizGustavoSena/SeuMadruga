import { getBalanceByUserIdResponse } from '@src/domain/models/balance';
import knex from 'knex';
import config from "../../knexfile";

const db = knex(config);

export default class BalanceService {
    tableTransactionName = 'transactions';
    tableAccountName = 'accounts';

    constructor() { };

    async getBalanceByUserId(userId: number): Promise<getBalanceByUserIdResponse[]> {
        const response = await db(`${this.tableTransactionName} as t`).sum('ammount')
            .join(`${this.tableAccountName} as acc`, 'acc.id', '=', 't.acc_id')
            .where({ user_id: userId, status: true })
            .where('date', '<=', new Date())
            .select('acc.id')
            .groupBy('acc.id')
            .orderBy('acc.id');

        return response as getBalanceByUserIdResponse[];
    }
}