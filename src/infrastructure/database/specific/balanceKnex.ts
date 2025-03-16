import { BalanceDatabase } from "@src/data/protocols/database/specif/balanceDatabase";
import { getBalanceByUserIdResponse } from "@src/domain/models/balance";
import KnexDatabase from "../knex";

export default class BalanceKnexDatabase extends KnexDatabase implements BalanceDatabase {
    tableAccountName = 'accounts';

    constructor() {
        super('transactions')
    };

    async getBalanceByUserId(userId: number): Promise<getBalanceByUserIdResponse[]> {
        const response = await this.db(`${this.tableName} as t`).sum('ammount')
            .join(`${this.tableAccountName} as acc`, 'acc.id', '=', 't.acc_id')
            .where({ user_id: userId, status: true })
            .where('date', '<=', new Date())
            .select('acc.id')
            .groupBy('acc.id')
            .orderBy('acc.id');

        return response as getBalanceByUserIdResponse[];
    }
}