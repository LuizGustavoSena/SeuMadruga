import { getBalanceByUserIdResponse } from "@src/domain/models/balance";
import { BalanceDatabase } from "../protocols/database/specif/balanceDatabase";
import DatabaseSpy from "./databaseSpy";

export default class BalanceDatabaseSpy extends DatabaseSpy implements BalanceDatabase {
    params: any;
    tableTransactionName: string;
    tableAccountName: string;

    constructor() {
        super();
    }

    async getBalanceByUserId(userId: number): Promise<getBalanceByUserIdResponse[]> {
        this.params = userId;

        return this.content;
    }

}