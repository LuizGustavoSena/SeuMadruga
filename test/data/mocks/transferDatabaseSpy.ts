import { insertTransactionsProps } from "@src/domain/models/transfer";
import { TransferDatabase } from "../protocols/database/specif/transferDatabase";
import TransactionDatabaseSpy from "./transactionDatabaseSpy";

export default class TransferDatabaseSpy extends TransactionDatabaseSpy implements TransferDatabase {
    params: any;

    constructor() {
        super();
    }

    async insertTransactions(params: insertTransactionsProps): Promise<void> {
        this.params = params;
    }
}