import { FindProps, FindResponse } from "@src/domain/models/transaction";
import { TransactionDatabase } from "../protocols/database/specif/transactionDatabase";
import DatabaseSpy from "./databaseSpy";

export default class TransactionDatabaseSpy extends DatabaseSpy implements TransactionDatabase {
    params: any;

    constructor() {
        super();
    };

    async findTransactions(params: FindProps): Promise<FindResponse[]> {
        this.params = params;

        return this.content;
    }

    async deleteByTransferId(transferId: number): Promise<void> {
        this.params = transferId;
    }
}