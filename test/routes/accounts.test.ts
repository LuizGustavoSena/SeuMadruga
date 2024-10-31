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

    test('Should be get all accounts', async () => {
        const account = {
            name: 'Acc 2',
            user_id: USER.id
        }

        const response = await request.post(URL).send(account);

        expect(response.status).toBe(201);
        expect(response.body.name).toBe(account.name);

        const get = await request.get(URL);

        expect(get.status).toBe(200);
        expect(get.body.length).toBeGreaterThan(0);
    });

})