import app from '@src/app';
import { CreateProps, Type } from '@src/domain/models/transaction';
import { CreateTransfer } from '@src/domain/models/transfer';
import BcryptEncrypt from '@src/infrastructure/encrypt/bcrypt';
import JwtSimpleJwt from '@src/infrastructure/jwt/jwtSimple';
import AuthService from '@src/services/auth';
import TransactionService from '@src/services/transaction';
import TransferService from '@src/services/transfer';
import UserService from '@src/services/user';
import knex from 'knex';
import moment from 'moment';
import supertest from 'supertest';
import config from "../../knexfile";

const db = knex(config);

const URL = '/v1/balance';

const transactionService = new TransactionService();
const transferService = new TransferService();

var token = '';
var generalToken = '';

const request = supertest(app);

describe('Balance', () => {
    beforeAll(async () => {
        await db.seed.run();

        const authService = new AuthService(new UserService(), new BcryptEncrypt(), new JwtSimpleJwt());

        const response = await authService.signin({
            email: 'email3@email.com',
            password: '123456789'
        });

        token = response.token;

        const anotherResponse = await authService.signin({
            email: 'email5@email.com',
            password: '123456789'
        });

        generalToken = anotherResponse.token;
    });

    test('Should be list only accounts with any transaction', async () => {
        const response = await request.get(URL)
            .set('authorization', `JWT ${token}`);

        expect(response.status).toBe(204);
    });

    test('Should be add input values', async () => {
        const params: CreateProps = {
            ammount: 200,
            description: 'Input value',
            type: Type.INPUT,
            acc_id: 10007,
            date: new Date(),
            status: true
        };

        await transactionService.create(params);

        const response = await request.get(URL)
            .set('authorization', `JWT ${token}`);

        expect(response.status).toBe(200);
        expect(response.body).toHaveLength(1);
        expect(response.body[0]).toHaveProperty('id');
        expect(response.body[0].id).toBe(10007);
        expect(response.body[0].sum).toBe(`${params.ammount}.00`);
    });

    test('Should be add output values', async () => {
        const params: CreateProps = {
            ammount: -100,
            description: 'Output value',
            type: Type.OUTPUT,
            acc_id: 10007,
            date: new Date(),
            status: true
        };

        await transactionService.create(params);

        const response = await request.get(URL)
            .set('authorization', `JWT ${token}`);

        expect(response.status).toBe(200);
        expect(response.body).toHaveLength(1);
        expect(response.body[0]).toHaveProperty('id');
        expect(response.body[0].id).toBe(10007);
        expect(response.body[0].sum).toBe(`${params.ammount * -1}.00`);
    });

    test('Should not consider balance of different accounts', async () => {
        const params: CreateProps = {
            ammount: 200,
            description: 'Input value',
            type: Type.INPUT,
            acc_id: 10008,
            date: new Date(),
            status: true
        };

        await transactionService.create(params);

        const response = await request.get(URL)
            .set('authorization', `JWT ${token}`);

        expect(response.status).toBe(200);
        expect(response.body).toHaveLength(2);
        expect(response.body[0]).toHaveProperty('id');
        expect(response.body[0].id).toBe(10007);
        expect(response.body[0].sum).toBe(`100.00`);
        expect(response.body[1]).toHaveProperty('id');
        expect(response.body[1].id).toBe(10008);
        expect(response.body[1].sum).toBe(`200.00`);
    });

    test('Should consider past balances', async () => {
        const params: CreateProps = {
            ammount: 250,
            description: 'Input value',
            type: Type.INPUT,
            acc_id: 10007,
            date: moment().subtract({ days: 5 }).toDate(),
            status: true
        };

        await transactionService.create(params);

        const response = await request.get(URL)
            .set('authorization', `JWT ${token}`);

        expect(response.status).toBe(200);
        expect(response.body).toHaveLength(2);
        expect(response.body[0]).toHaveProperty('id');
        expect(response.body[0].id).toBe(10007);
        expect(response.body[0].sum).toBe(`350.00`);
        expect(response.body[1]).toHaveProperty('id');
        expect(response.body[1].id).toBe(10008);
        expect(response.body[1].sum).toBe(`200.00`);
    });

    test('Should not consider future balances', async () => {
        const params: CreateProps = {
            ammount: 250,
            description: 'Input value',
            type: Type.INPUT,
            acc_id: 10007,
            date: moment().add({ days: 5 }).toDate(),
            status: true
        };

        await transactionService.create(params);

        const response = await request.get(URL)
            .set('authorization', `JWT ${token}`);

        expect(response.status).toBe(200);
        expect(response.body).toHaveLength(2);
        expect(response.body[0]).toHaveProperty('id');
        expect(response.body[0].id).toBe(10007);
        expect(response.body[0].sum).toBe(`350.00`);
        expect(response.body[1]).toHaveProperty('id');
        expect(response.body[1].id).toBe(10008);
        expect(response.body[1].sum).toBe(`200.00`);
    });

    test('Should consider transfer', async () => {
        const params: CreateTransfer = {
            ammount: 250,
            description: '1',
            acc_ori_id: 10007,
            acc_dest_id: 10008,
            date: moment().add({ days: 5 }).toDate(),
            user_id: 10002
        };

        await transferService.create(params);

        const response = await request.get(URL)
            .set('authorization', `JWT ${token}`);

        expect(response.status).toBe(200);
        expect(response.body).toHaveLength(2);
        expect(response.body[0]).toHaveProperty('id');
        expect(response.body[0].id).toBe(10007);
        expect(response.body[0].sum).toBe(`100.00`);
        expect(response.body[1]).toHaveProperty('id');
        expect(response.body[1].id).toBe(10008);
        expect(response.body[1].sum).toBe(`450.00`);
    });

    test('Should calculate balance of user`s accounts', async () => {
        const response = await request.get(URL)
            .set('authorization', `JWT ${generalToken}`);

        expect(response.status).toBe(200);
        expect(response.body).toHaveLength(2);
        expect(response.body[0]).toHaveProperty('id');
        expect(response.body[0].id).toBe(10011);
        expect(response.body[0].sum).toBe(`162.00`);
        expect(response.body[1]).toHaveProperty('id');
        expect(response.body[1].id).toBe(10012);
        expect(response.body[1].sum).toBe(`-248.00`);
    });
});