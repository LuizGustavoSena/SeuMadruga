import { TransactionDatabase } from "@src/data/protocols/database/specif/transactionDatabase";
import TransactionKnexDatabase from "@src/infrastructure/database/specific/transactionKnex";

export default class MakeTransactionDatabase {
    private static instance: TransactionDatabase;

    constructor() { };

    static getInstance(): TransactionDatabase {
        if (!MakeTransactionDatabase.instance)
            MakeTransactionDatabase.instance = new TransactionKnexDatabase();

        return MakeTransactionDatabase.instance;
    }
}