import { UserModel, UserProps } from '@src/domain/models/user';
import knex from 'knex';
import config from "../../knexfile";

const db = knex(config);

export default class UserService {
    constructor() { }

    async findAll(): Promise<UserModel[]> {
        const users = await db.select('id', 'name', 'email').from('users');

        return users;
    }

    async save(params: UserProps): Promise<UserModel> {
        const response = await db('users').insert(params, ['id', 'name', 'email']);

        return response[0];
    }
}