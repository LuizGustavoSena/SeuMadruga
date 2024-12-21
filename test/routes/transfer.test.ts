import app from '@src/app';
import { CreateTransfer } from '@src/domain/models/transfer';
import AuthService from '@src/services/auth';
import UserService from '@src/services/user';
import supertest from 'supertest';

const URL = '/v1/transfers';
var token = '';

const request = supertest(app);

describe('Auth', () => {
    beforeAll(async () => {
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
    });
})