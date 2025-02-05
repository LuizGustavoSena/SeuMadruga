import { getBalanceByUserIdResponse } from "@src/domain/models/balance";

export interface BalanceDatabase {
    tableTransactionName: string;
    tableAccountName: string;

    getBalanceByUserId(userId: number): Promise<getBalanceByUserIdResponse[]>
}