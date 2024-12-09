import { CreateProps, CreateResponse, FindProps, FindResponse } from "@src/domain/models/transaction";
import knex from 'knex';
import config from "../../knexfile";

const db = knex(config);

export default class TransactionService {
    tableName = 'transactions';
    constructor() { }

    async find(params: FindProps): Promise<FindResponse[]> {
        const response = await db(this.tableName)
            .join('accounts', 'accounts.id', 'acc_id')
            .where(params.filter ?? {})
            .andWhere('accounts.user_id', '=', params.user_id)
            .select(`${this.tableName}.id`, 'description', 'type', 'date', 'ammount', 'acc_id');

        return response;
    }

    async create(params: CreateProps): Promise<CreateResponse> {
        const response = await db(this.tableName)
            .insert({ ...params, date: new Date() }, ['id', 'description', 'type', 'date', 'ammount', 'acc_id']);

        return response[0];
    }
};