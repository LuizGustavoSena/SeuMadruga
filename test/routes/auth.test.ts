import app from '@src/app';
import UserService from '@src/services/user';
import supertest from 'supertest';
import { user } from './models/user';

const URL = '/auth';
const URL_USERS = '/users';

const request = supertest(app);
const userService = new UserService();

const USER: user = {
    name: 'Walter Mitty',
    email: `${Date.now()}@email.com`,
    password: '12354'
}

describe('Auth', () => {
    beforeAll(async () => {
        const response = await userService.save(USER);;

        USER.id = response.id;
    });

    test('Should be successful create account', async () => {
        const response = await request.post(`${URL}/signup`)
            .send({
                name: 'Walter',
                email: `${Date.now()}@email.com`,
                password: '12354'
            });

        expect(response.status).toBe(201);
        expect(response.body.name).toBe('Walter');
        expect(response.body).toHaveProperty('email');
        expect(response.body).not.toHaveProperty('password');
    });

    test('Should be auth successful user', async () => {
        const response = await request.post(`${URL}/signin`).send({
            email: USER.email,
            password: USER.password
        });

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('token');
    });

    test('Should be auth error with wrong email user', async () => {
        const response = await request.post(`${URL}/signin`).send({
            email: 'user@user.com',
            password: USER.password
        });

        expect(response.status).toBe(400);
        expect(response.body.error).toContain('Usuário não encontrado');
    });

    test('Should be auth error with wrong password user', async () => {
        const response = await request.post(`${URL}/signin`).send({
            email: USER.email,
            password: '54321'
        });

        expect(response.status).toBe(400);
        expect(response.body.error).toContain('Usuário não encontrado');
    });

    test('Should be auth error with wrong password and email user', async () => {
        const response = await request.post(`${URL}/signin`).send({
            email: 'user@user.com',
            password: '54321'
        });

        expect(response.status).toBe(400);
        expect(response.body.error).toBe('Usuário não encontrado');
    });

    test('Should be error when request any endpoint without token', async () => {
        const response = await request.get(URL_USERS);

        expect(response.status).toBe(401);
    });
})