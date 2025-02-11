import { Database } from "@src/data/protocols/database/database";
import KnexDatabase from "@src/infrastructure/database/knex";

export default class MakeDatabase {
    private static instance: Record<string, Database> = {};

    constructor() { };

    static getInstance(table: string): Database {
        if (!MakeDatabase.instance[table])
            MakeDatabase.instance[table] = new KnexDatabase(table);

        return MakeDatabase.instance[table];
    }
}