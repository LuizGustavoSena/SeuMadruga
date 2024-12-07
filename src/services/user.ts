import { FindByEmailResponse, UserModel, UserProps } from '@src/domain/models/user';
import knex from 'knex';
import config from "../../knexfile";
const bcrypt = require('bcryptjs');

const db = knex(config);

export default class UserService {
    constructor() { }

    async findAll(): Promise<UserModel[]> {
        const users = await db.select('id', 'name', 'email').from('users');

        return users;
    }

    async findByEmail(email: string): Promise<FindByEmailResponse> {
        const users = await db.select().from('users').where({ email }).first();

        return users;
    }

    async save(params: UserProps): Promise<UserModel> {
        const existEmail = await this.findByEmail(params.email);

        if (existEmail)
            throw new Error('Email já existente');

        const encryptPassword = await this.encryptText(params.password);

        const response = await db('users').insert({ ...params, password: encryptPassword }, ['id', 'name', 'email']);

        return response[0];
    }

    private async encryptText(text: string): Promise<string> {
        const sant = await bcrypt.genSalt(10);
        return await bcrypt.hash(text, sant);
    }
}