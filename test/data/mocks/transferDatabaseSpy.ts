import { insertTransactionsProps } from "@src/domain/models/transfer";
import { TransferDatabase } from "../protocols/database/specif/transferDatabase";
import DatabaseSpy from "./databaseSpy";

export default class TransferDatabaseSpy extends DatabaseSpy implements TransferDatabase {
    params: any;

    constructor() {
        super();
    }

    async insertTransactions(params: insertTransactionsProps): Promise<void> {
        this.params = params;
    }

    async deleteTransactionsByTransferId(id: number): Promise<void> {
        this.params = { id };
    }
}