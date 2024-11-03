import app from '@src/app';
import supertest from 'supertest';

const URL = '/accounts';
const URL_USERS = '/users';

const request = supertest(app);

const USER = {
    id: undefined,
    name: 'Walter Mitty',
    email: `${Date.now()}@email.com`,
    password: '12354'
}

describe('Accounts', () => {
    beforeAll(async () => {
        const response = await request.post(URL_USERS).send(USER);

        USER.id = response.body.id;
    });

    test('Should be create a successful account', async () => {
        const account = {
            name: 'Acc 1',
            user_id: USER.id
        }

        const response = await request.post(URL).send(account);

        expect(response.status).toBe(201);
        expect(response.body.name).toBe(account.name);
    });

    test('Should be error in create a account without name', async () => {
        const account = {
            user_id: USER.id
        }

        const response = await request.post(URL).send(account);

        expect(response.status).toBe(400);
        expect(response.body.error).toContain('name');
    });

    test('Should be get all accounts', async () => {
        const account = {
            name: 'Acc 2',
            user_id: USER.id
        }

        await request.post(URL).send(account);

        const get = await request.get(URL);

        expect(get.status).toBe(200);
        expect(get.body.length).toBeGreaterThan(0);
    });

    test('Should be get by id account successful', async () => {
        const account = {
            name: 'Acc 3',
            user_id: USER.id
        }

        const response = await request.post(URL).send(account);

        const get = await request.get(`${URL}/${response.body.id}`);

        expect(get.status).toBe(200);
        expect(get.body.name).toBe(account.name);
    });

    test('Should be get by id account successful', async () => {
        const get = await request.get(`${URL}/${-1}`);

        expect(get.status).toBe(404);
    });

    test('Should be update a successful account', async () => {
        const account = {
            name: 'Acc 4',
            user_id: USER.id
        }

        const updatedName = 'Acc update';

        const response = await request.post(URL).send(account);

        const put = await request.put(`${URL}/${response.body.id}`).send({ name: updatedName });

        expect(put.status).toBe(200);
        expect(put.body.name).toBe(updatedName);
    });

    test('Should be delete by id account successful', async () => {
        const account = {
            name: 'Acc 5',
            user_id: USER.id
        }

        const response = await request.post(URL).send(account);

        const del = await request.delete(`${URL}/${response.body.id}`);

        const get = await request.get(`${URL}/${response.body.id}`);

        expect(del.status).toBe(200);
        expect(get.status).toBe(404);
    });
})