import { CreateProps, CreateResponse, FindProps, FindResponse, UpdateProps, UpdateResponse } from "@src/domain/models/transaction";
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
            .select(`${this.tableName}.id`, 'description', 'type', 'date', 'ammount', 'acc_id', 'transfer_id');

        return response;
    }

    async findById(id: number): Promise<FindResponse> {
        const response = await db(this.tableName)
            .where({ id })
            .select('id', 'description', 'type', 'date', 'ammount', 'acc_id');

        return response[0];
    }

    async create(params: CreateProps): Promise<CreateResponse> {
        const dataRequest = params.date ?? new Date();

        const response = await db(this.tableName)
            .insert({ ...params, date: dataRequest }, ['id', 'description', 'type', 'date', 'ammount', 'acc_id']);

        return response[0];
    }

    async updateById(id: number, params: UpdateProps): Promise<UpdateResponse> {
        const response = await db(this.tableName)
            .where({ id })
            .update(params, ['id', 'description', 'type', 'date', 'ammount', 'acc_id']);

        return response[0];
    }

    async deleteById(id: number): Promise<void> {
        await db(this.tableName).where({ id }).del();
    }
};