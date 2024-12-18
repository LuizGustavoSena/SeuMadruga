import { CreateProps, CreateResponse, GetAllResponse, GetByIdResponse, UpdateParams, UpdateResponse } from "@src/domain/models/account";
import knex from 'knex';
import config from "../../knexfile";
import TransactionService from "./transaction";

const db = knex(config);

export default class AccountService {
    tableName = 'accounts';

    constructor(
        private transactionService: TransactionService
    ) { };

    async create(params: CreateProps): Promise<CreateResponse> {
        const account = await this.getByFilter({ name: params.name, user_id: params.user_id });

        if (account.length > 0)
            throw new Error('Conta existente');

        const response = await db(this.tableName).insert(params, ['id', 'name', 'user_id']);

        return response[0];
    }

    async getAll(): Promise<GetAllResponse> {
        const response = await db.select('id', 'name').from(this.tableName);

        return response;
    }

    async getByFilter(filter: any): Promise<GetByIdResponse[]> {
        const response = await db.select('id', 'name', 'user_id').from(this.tableName).where(filter);

        return response;
    }

    async update(params: UpdateParams): Promise<UpdateResponse> {
        const response = await db(this.tableName).where({ id: params.id }).update({
            name: params.name
        }, ['id', 'name']);

        return response[0];
    }

    async deleteById(id: number): Promise<void> {
        const account = await this.getByFilter({ id });

        const transaction = await this.transactionService.find({ user_id: account[0].user_id });

        if (transaction.length > 0) throw new Error('Não é possível excluir conta por ter transações vinculadas a ela');

        await db(this.tableName).where({ id }).del();
    }
}