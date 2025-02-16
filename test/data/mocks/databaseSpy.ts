import { faker } from '@faker-js/faker';
import { Database, ParamsUpdateDatabase } from "../protocols/database/database";

export default class DatabaseSpy implements Database {
    tableName: string = 'Teste';
    content: any[] = [];

    constructor() { };

    async create<T, R>(params: T): Promise<R> {
        this.content.push(params);

        return { ...params, id: faker.number.int() } as R;
    }

    async getAll<T>(): Promise<T> {
        return this.content as T;
    }

    async getByFIlter<T>(filter: any): Promise<T> {
        const keys = Object.keys(filter);
        var result = this.content;

        keys.forEach(key => {
            result = result.filter(el => el[key] === filter[key])
        });

        return result as T;
    }

    async update<T>(params: ParamsUpdateDatabase<T>): Promise<T> {
        this.content = this.content.map(el => {
            if (el.id != params.id) return el;

            return params.data;
        });

        return { ...params, id: params.id } as T;
    }

    async deleteById(id: number): Promise<void> {
        this.content = this.content.filter(el => el.id != id);
    }
}