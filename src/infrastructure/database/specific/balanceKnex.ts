import { BalanceDatabase } from "@src/data/protocols/database/specif/balanceDatabase";
import { getBalanceByUserIdResponse } from "@src/domain/models/balance";
import knex from 'knex';
import config from "../../../../knexfile";

export default class BalanceKnexDatabase implements BalanceDatabase {
    db = knex(config);
    tableTransactionName = 'transactions';
    tableAccountName = 'accounts';

    constructor() { };

    async getBalanceByUserId(userId: number): Promise<getBalanceByUserIdResponse[]> {
        const response = await this.db(`${this.tableTransactionName} as t`).sum('ammount')
            .join(`${this.tableAccountName} as acc`, 'acc.id', '=', 't.acc_id')
            .where({ user_id: userId, status: true })
            .where('date', '<=', new Date())
            .select('acc.id')
            .groupBy('acc.id')
            .orderBy('acc.id');

        return response as getBalanceByUserIdResponse[];
    }
}