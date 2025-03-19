import { TransferDatabase } from "@src/data/protocols/database/specif/transferDatabase";
import TransferKnexDatabase from "@src/infrastructure/database/specific/transferKnex";

export default class MakeTransferDatabase {
    private static instance: TransferDatabase;

    constructor() { };

    static getInstance(): TransferDatabase {
        if (!MakeTransferDatabase.instance)
            MakeTransferDatabase.instance = new TransferKnexDatabase();

        return MakeTransferDatabase.instance;
    }
}