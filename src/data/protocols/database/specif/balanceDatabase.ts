import { getBalanceByUserIdResponse } from "@src/domain/models/balance";

export interface BalanceDatabase {
    tableAccountName: string;

    getBalanceByUserId(userId: number): Promise<getBalanceByUserIdResponse[]>
}