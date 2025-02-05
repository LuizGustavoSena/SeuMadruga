import { FindProps, FindResponse } from "@src/domain/models/transaction";
import { Database } from "./database";

export interface TransactionDatabase extends Database {
    findTransactions(params: FindProps): Promise<FindResponse[]>;
}