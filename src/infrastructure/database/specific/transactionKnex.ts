import { TransactionDatabase } from "@src/data/protocols/database/specif/transactionDatabase";
import { FindProps, FindResponse } from "@src/domain/models/transaction";
import KnexDatabase from "../knex";

export default class TransactionKnexDatabase extends KnexDatabase implements TransactionDatabase {
    constructor() {
        super('transactions');
    }

    async findTransactions(params: FindProps): Promise<FindResponse[]> {
        const response = await this.db(this.tableName)
            .join('accounts', 'accounts.id', 'acc_id')
            .where(params.filter ?? {})
            .andWhere('accounts.user_id', '=', params.user_id)
            .select(`${this.tableName}.id`, 'description', 'type', 'date', 'ammount', 'acc_id', 'transfer_id');

        return response;
    }

    async deleteByTransferId(transferId: number): Promise<void> {
        await this.db(this.tableName)
            .where({ transfer_id: transferId })
            .del();
    }
}