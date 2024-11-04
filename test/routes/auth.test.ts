import app from '@src/app';
import supertest from 'supertest';

const URL = '/auth';
const URL_USERS = '/users';

const request = supertest(app);

const USER = {
    id: undefined,
    name: 'Walter Mitty',
    email: `${Date.now()}@email.com`,
    password: '12354'
}

describe('Auth', () => {
    beforeAll(async () => {
        const response = await request.post(URL_USERS).send(USER);

        USER.id = response.body.id;
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
})