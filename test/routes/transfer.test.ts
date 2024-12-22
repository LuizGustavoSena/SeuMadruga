import app from '@src/app';
import { Type } from '@src/domain/models/transaction';
import { CreateTransfer } from '@src/domain/models/transfer';
import AuthService from '@src/services/auth';
import TransactionService from '@src/services/transaction';
import UserService from '@src/services/user';
import knex from 'knex';
import supertest from 'supertest';
import config from "../../knexfile";

const db = knex(config);
const URL = '/v1/transfers';
var token = '';

const transactionService = new TransactionService();

const request = supertest(app);

describe('Transfer', () => {
    beforeAll(async () => {
        await db.seed.run();

        const authService = new AuthService(new UserService());

        const response = await authService.signin({
            email: 'email1@email.com',
            password: '123456789'
        });

        token = response.token;
    });

    test('Should be list only user`s transfers', async () => {
        const response = await request.get(URL)
            .set('authorization', `JWT ${token}`);

        expect(response.status).toBe(200);
        expect(response.body).toHaveLength(1);
        expect(response.body[0].description).toBe('Transfer 1');
    });

    test('Should be create successful transfer', async () => {
        const params: Partial<CreateTransfer> = {
            acc_ori_id: 10003,
            acc_dest_id: 10004,
            ammount: 100,
            description: 'Successful transfer'
        };

        const response = await request.post(URL)
            .set('authorization', `JWT ${token}`)
            .send(params);

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('id');
        expect(response.body).toHaveProperty('description');
        expect(response.body.description).toBe(params.description);

        const transactions = await transactionService.find({
            user_id: 10000,
            filter: {
                transfer_id: response.body.id
            }
        });

        expect(transactions).toHaveLength(2);
        expect(transactions[0].description).toBe(`Transfer to account_id: ${params.acc_dest_id}`);
        expect(transactions[0].ammount).toBe(`-${params.ammount}.00`);
        expect(transactions[0].acc_id).toBe(params.acc_ori_id);
        expect(transactions[0].type).toBe(Type.OUTPUT);
        expect(transactions[0].transfer_id).toBe(response.body.id);
        expect(transactions[1].description).toBe(`Transfer from account_id: ${params.acc_ori_id}`);
        expect(transactions[1].ammount).toBe(`${params.ammount}.00`);
        expect(transactions[1].acc_id).toBe(params.acc_dest_id);
        expect(transactions[1].type).toBe(Type.INPUT);
        expect(transactions[1].transfer_id).toBe(response.body.id);
    });
})