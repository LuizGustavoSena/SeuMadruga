import app from '@src/app';
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
})