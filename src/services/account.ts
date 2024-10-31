import { CreateProps, CreateResponse, GetAllResponse } from "@src/domain/models/account";
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
}