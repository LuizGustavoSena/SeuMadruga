import app from '@src/app';
import AuthService from '@src/data/use-cases/auth';
import TransactionService from '@src/data/use-cases/transaction';
import UserService from '@src/data/use-cases/user';
import { Type } from '@src/domain/models/transaction';
import { CreateTransfer, TransferProps } from '@src/domain/models/transfer';
import KnexDatabase from '@src/infrastructure/database/knex';
import TransactionKnexDatabase from '@src/infrastructure/database/specific/transactionKnex';
import BcryptEncrypt from '@src/infrastructure/encrypt/bcrypt';
import JwtSimpleJwt from '@src/infrastructure/jwt/jwtSimple';
import knex from 'knex';
import supertest from 'supertest';
import config from "../../knexfile";

const db = knex(config);
const URL = '/v1/transfers';
var token = '';

const transactionService = new TransactionService(new TransactionKnexDatabase());

const request = supertest(app);

describe('Transfer', () => {
    beforeAll(async () => {
        await db.seed.run();

        const bcrypt = new BcryptEncrypt();
        const userService = new UserService(new KnexDatabase('users'), bcrypt)
        const authService = new AuthService(userService, bcrypt, new JwtSimpleJwt());

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

    test('Should be error when create transfer without description', async () => {
        const params: Partial<CreateTransfer> = {
            acc_ori_id: 10003,
            acc_dest_id: 10004,
            ammount: 100
        };

        const response = await request.post(URL)
            .set('authorization', `JWT ${token}`)
            .send(params);

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('error');
        expect(response.body.error).toContain('description deve ser preenchido');
    });

    test('Should be error when create transfer without ammount', async () => {
        const params: Partial<CreateTransfer> = {
            acc_ori_id: 10003,
            acc_dest_id: 10004,
            description: 'Error transfer'
        };

        const response = await request.post(URL)
            .set('authorization', `JWT ${token}`)
            .send(params);

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('error');
        expect(response.body.error).toContain('ammount deve ser preenchido');
    });

    test('Should be error when create transfer without acc_ori_id', async () => {
        const params: Partial<CreateTransfer> = {
            acc_dest_id: 10004,
            ammount: 100,
            description: 'Error transfer'
        };

        const response = await request.post(URL)
            .set('authorization', `JWT ${token}`)
            .send(params);

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('error');
        expect(response.body.error).toContain('acc_ori_id deve ser preenchido');
    });

    test('Should be error when create transfer without acc_dest_id', async () => {
        const params: Partial<CreateTransfer> = {
            acc_ori_id: 10003,
            ammount: 100,
            description: 'Error transfer'
        };

        const response = await request.post(URL)
            .set('authorization', `JWT ${token}`)
            .send(params);

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('error');
        expect(response.body.error).toContain('acc_dest_id deve ser preenchido');
    });

    test('Should be error when create transfer with acc_ori_id equal acc_dest_id', async () => {
        const params: Partial<CreateTransfer> = {
            acc_ori_id: 10003,
            acc_dest_id: 10003,
            ammount: 100,
            description: 'Error transfer'
        };

        const response = await request.post(URL)
            .set('authorization', `JWT ${token}`)
            .send(params);

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('error');
        expect(response.body.error).toContain('acc_ori_id e acc_dest_id devem ter valores diferentes');
    });

    test('Should be error when create transfer with another acc_ori_id id', async () => {
        const params: Partial<CreateTransfer> = {
            acc_ori_id: 10005,
            acc_dest_id: 10004,
            ammount: 100,
            description: 'Error transfer'
        };

        const response = await request.post(URL)
            .set('authorization', `JWT ${token}`)
            .send(params);

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('error');
        expect(response.body.error).toContain('acc_ori_id não pertence a esse usuário');
    });

    test('Should be error when create transfer with another acc_dest_id id', async () => {
        const params: Partial<CreateTransfer> = {
            acc_ori_id: 10003,
            acc_dest_id: 10006,
            ammount: 100,
            description: 'Error transfer'
        };

        const response = await request.post(URL)
            .set('authorization', `JWT ${token}`)
            .send(params);

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('error');
        expect(response.body.error).toContain('acc_dest_id não pertence a esse usuário');
    });

    test('Should be successful get by id', async () => {
        const response = await request.get(`${URL}/10007`)
            .set('authorization', `JWT ${token}`);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('description');
        expect(response.body.description).toContain('Transfer 1');
    });

    test('Should be error 404 when send wrong id', async () => {
        const response = await request.get(`${URL}/10000`)
            .set('authorization', `JWT ${token}`);

        expect(response.status).toBe(404);
    });

    test('Should be error 403 when get a transfer from another user', async () => {
        const response = await request.get(`${URL}/10008`)
            .set('authorization', `JWT ${token}`);

        expect(response.status).toBe(403);
    });

    test('Should be successful update by id', async () => {
        const updatedValue: Partial<TransferProps> = {
            description: 'Updated transfer',
            ammount: 500
        };

        const response = await request.put(`${URL}/10007`)
            .set('authorization', `JWT ${token}`)
            .send(updatedValue);

        expect(response.status).toBe(200);
        expect(response.body.description).toBe(updatedValue.description);
        expect(response.body.ammount).toBe(`${updatedValue.ammount}.00`);
    });

    test('Should be error 404 when update transfer with wrong id', async () => {
        const updatedValue: Partial<TransferProps> = {
            description: 'Updated transfer',
            ammount: 500
        };

        const response = await request.put(`${URL}/10000`)
            .set('authorization', `JWT ${token}`)
            .send(updatedValue);

        expect(response.status).toBe(404);
    });

    test('Should be error 403 when udpate transfer from another user', async () => {
        const updatedValue: Partial<TransferProps> = {
            description: 'Updated transfer',
            ammount: 500
        };

        const response = await request.put(`${URL}/10008`)
            .set('authorization', `JWT ${token}`)
            .send(updatedValue);

        expect(response.status).toBe(403);
    });

    test('Should be successful delete by id', async () => {
        const response = await request.delete(`${URL}/10007`)
            .set('authorization', `JWT ${token}`);

        const get = await request.get(`${URL}/10007`)
            .set('authorization', `JWT ${token}`);

        const transactions = await transactionService.find({
            user_id: 10000,
            filter: {
                transfer_id: 10007
            }
        });

        expect(response.status).toBe(200);
        expect(get.status).toBe(404);
        expect(transactions.length).toBe(0);
    });

    test('Should be error 404 when delete transfer with wrong id', async () => {
        const updatedValue: Partial<TransferProps> = {
            description: 'Updated transfer',
            ammount: 500
        };

        const response = await request.delete(`${URL}/10000`)
            .set('authorization', `JWT ${token}`)
            .send(updatedValue);

        expect(response.status).toBe(404);
    });

    test('Should be error 403 when delete transfer from another user', async () => {
        const updatedValue: Partial<TransferProps> = {
            description: 'Updated transfer',
            ammount: 500
        };

        const response = await request.delete(`${URL}/10008`)
            .set('authorization', `JWT ${token}`)
            .send(updatedValue);

        expect(response.status).toBe(403);
    });
})