import { CreateProps, CreateResponse } from "@src/domain/models/account";
import knex from 'knex';
import config from "../../knexfile";

const db = knex(config);

export default class AccountService {
    constructor() { };

    async create(params: CreateProps): Promise<CreateResponse> {
        const response = await db('accounts').insert(params, ['id', 'name']);

        return response[0];
    }
}