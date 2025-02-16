import { getBalanceByUserIdResponse } from "../models/balance";

export interface Balance {
    getBalanceByUserId(userId: number): Promise<getBalanceByUserIdResponse[]>;
}