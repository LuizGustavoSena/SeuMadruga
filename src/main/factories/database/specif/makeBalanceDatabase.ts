import { BalanceDatabase } from "@src/data/protocols/database/specif/balanceDatabase";
import BalanceKnexDatabase from "@src/infrastructure/database/specific/balanceKnex";

export default class MakeBalanceDatabase {
    private static instance: BalanceDatabase;

    constructor() { };

    static getInstance(): BalanceDatabase {
        if (!MakeBalanceDatabase.instance)
            MakeBalanceDatabase.instance = new BalanceKnexDatabase();

        return MakeBalanceDatabase.instance;
    }
}