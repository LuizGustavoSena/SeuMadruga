import { insertTransactionsProps } from "@src/domain/models/transfer";
import { Database } from "./database";

export interface TransferDatabase extends Database {
    insertTransactions(params: insertTransactionsProps): Promise<void>;
    deleteTransactionsByTransferId(id: number): Promise<void>;
}