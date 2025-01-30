import { getBalanceByUserIdResponse } from "@src/domain/models/balance";
import { FindProps, FindResponse } from "@src/domain/models/transaction";

export type ParamsUpdateDatabase<T> = {
    id: number;
    data: Partial<Omit<T, 'id'>>
}

export interface Database {
    tableName: string;

    create<T, R>(params: T): Promise<R>;
    getAll<T>(): Promise<T>;
    getByFIlter<T>(filter: any): Promise<T>;
    update<T>(params: ParamsUpdateDatabase<T>): Promise<T>;
    deleteById(id: number): Promise<void>;
}

export interface BalanceDatabase {
    tableTransactionName: string;
    tableAccountName: string;

    getBalanceByUserId(userId: number): Promise<getBalanceByUserIdResponse[]>
}

export interface TransactionDatabase extends Database {
    findTransactions(params: FindProps): Promise<FindResponse[]>;
}