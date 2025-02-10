import knex from 'knex';
import config from "../../../knexfile";
import { Database, ParamsUpdateDatabase } from "../../data/protocols/database/database";

export default class KnexDatabase implements Database {
    db = knex(config);
    tableName;

    constructor(tableName: string) {
        this.tableName = tableName
    }

    async create<T, R>(params: T): Promise<R> {
        const response = await this.db(this.tableName).insert(params, '*');

        return response[0];
    }

    async getAll<T>(): Promise<T> {
        const response = await this.db.select('*').from(this.tableName);

        return response as T;
    }

    async getByFIlter<T>(filter: any): Promise<T> {
        const response = await this.db.select('*').from(this.tableName).where(filter);

        return response as T;
    }

    async update<T>(params: ParamsUpdateDatabase<T>): Promise<T> {
        const response = await this.db(this.tableName).where({ id: params.id }).update(params.data, ['*']);

        return response[0];
    }

    async deleteById(id: number): Promise<void> {
        await this.db(this.tableName).where({ id }).del();
    }
}