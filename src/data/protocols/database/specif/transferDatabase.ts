import { insertTransactionsProps } from "@src/domain/models/transfer";
import { TransactionDatabase } from "./transactionDatabase";

export interface TransferDatabase extends TransactionDatabase {
    insertTransactions(params: insertTransactionsProps): Promise<void>;
}