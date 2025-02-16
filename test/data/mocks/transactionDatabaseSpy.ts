import { FindProps, FindResponse } from "@src/domain/models/transaction";
import { TransactionDatabase } from "../protocols/database/specif/transactionDatabase";
import DatabaseSpy from "./databaseSpy";

export default class TransactionDatabaseSpy extends DatabaseSpy implements TransactionDatabase {
    transactions: FindResponse[] = [];
    params: FindProps;

    constructor() {
        super();
    };

    async findTransactions(params: FindProps): Promise<FindResponse[]> {
        this.params = params;

        return this.transactions;
    }

    async deleteByTransferId(transferId: number): Promise<void> {
        this.transactions = this.transactions.filter(el => el.transfer_id != transferId);
    }
}