import { CreateProps, CreateResponse, GetAllResponse, GetByIdResponse, UpdateParams, UpdateResponse } from "@src/domain/models/account";
import knex from 'knex';
import config from "../../knexfile";

const db = knex(config);

export default class AccountService {
    tableName = 'accounts';

    constructor() { };

    async create(params: CreateProps): Promise<CreateResponse> {
        const response = await db(this.tableName).insert(params, ['id', 'name']);

        return response[0];
    }

    async getAll(): Promise<GetAllResponse> {
        const response = await db.select('id', 'name').from(this.tableName);

        return response;
    }

    async getById(id: number): Promise<GetByIdResponse> {
        const response = await db.select('id', 'name').from(this.tableName).where({ id });

        return response[0];
    }

    async update(params: UpdateParams): Promise<UpdateResponse> {
        const response = await db(this.tableName).where({ id: params.id }).update({
            name: params.name
        }, ['id', 'name']);

        return response[0];
    }

    async deleteById(id: number): Promise<void> {
        await db(this.tableName).where({ id }).del();
    }
}