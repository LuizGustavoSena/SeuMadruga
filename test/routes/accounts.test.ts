import app from '@src/app';
import { GetByIdResponse } from '@src/domain/models/account';
import AuthService from '@src/services/auth';
import UserService from '@src/services/user';
import supertest from 'supertest';
import { user } from './models/user';

const URL = '/v1/accounts';

const request = supertest(app);

const userService = new UserService();
const authService = new AuthService(userService);

const USER: user = {
    name: 'Walter Mitty',
    email: `${Date.now()}@email.com`,
    password: '12354'
}

const ANOTHER_USER: user = {
    name: 'Another Walter Mitty',
    email: `Another${Date.now()}@email.com`,
    password: '12354'
}

describe('Accounts', () => {
    beforeAll(async () => {
        const response = await userService.save(USER);;
        const another_response = await userService.save(ANOTHER_USER);;

        const token = await authService.signin({
            email: USER.email,
            password: USER.password
        });
        const another_token = await authService.signin({
            email: ANOTHER_USER.email,
            password: ANOTHER_USER.password
        });

        USER.token = token.token;
        USER.id = response.id;

        ANOTHER_USER.token = another_token.token;
        ANOTHER_USER.id = another_response.id;
    });

    test('Should be create a successful account', async () => {
        const account = {
            name: 'Acc 1'
        }

        const response = await request.post(URL)
            .set('authorization', `JWT ${USER.token}`)
            .send(account);

        expect(response.status).toBe(201);
        expect(response.body.name).toBe(account.name);
    });

    test('Should be error in create a account without name', async () => {
        const response = await request.post(URL)
            .set('authorization', `JWT ${USER.token}`);

        expect(response.status).toBe(400);
        expect(response.body.error).toContain('name');
    });

    test('Should be get by id account successful', async () => {
        const account = {
            name: 'Acc 3'
        }

        const response = await request.post(URL)
            .set('authorization', `JWT ${USER.token}`)
            .send(account);

        const get = await request.get(`${URL}/${response.body.id}`)
            .set('authorization', `JWT ${USER.token}`);

        expect(response.status).toBe(201);
        expect(get.status).toBe(200);
        expect(get.body.name).toBe(account.name);
    });

    test('Should be get by id account successful', async () => {
        const get = await request.get(`${URL}/${-1}`)
            .set('authorization', `JWT ${USER.token}`);

        expect(get.status).toBe(404);
    });

    test('Should be update a successful account', async () => {
        const account = {
            name: 'Acc 4'
        }

        const updatedName = 'Acc update';

        const response = await request.post(URL)
            .set('authorization', `JWT ${USER.token}`)
            .send(account);

        const put = await request.put(`${URL}/${response.body.id}`)
            .set('authorization', `JWT ${USER.token}`)
            .send({ name: updatedName });

        expect(put.status).toBe(200);
        expect(put.body.name).toBe(updatedName);
    });

    test('Should be delete by id account successful', async () => {
        const account = {
            name: 'Acc 5'
        }

        const response = await request.post(URL)
            .set('authorization', `JWT ${USER.token}`)
            .send(account);

        const del = await request.delete(`${URL}/${response.body.id}`)
            .set('authorization', `JWT ${USER.token}`);

        const get = await request.get(`${URL}/${response.body.id}`)
            .set('authorization', `JWT ${USER.token}`);

        expect(del.status).toBe(200);
        expect(get.status).toBe(404);
    });

    test('Should be list only accounts by user', async () => {
        const account = { name: 'USER' };
        const another_account = { name: 'ANOTHER_USER' };

        await request.post(URL)
            .set('authorization', `JWT ${USER.token}`)
            .send(account);

        await request.post(URL)
            .set('authorization', `JWT ${ANOTHER_USER.token}`)
            .send(another_account);

        const response = await request.get(URL)
            .set('authorization', `JWT ${USER.token}`);

        const another_response = await request.get(URL)
            .set('authorization', `JWT ${ANOTHER_USER.token}`);

        expect(response.status).toBe(200);
        expect(response.body.length).toBeGreaterThanOrEqual(1);
        expect(response.body.find((el: GetByIdResponse) => el.name === account.name)).not.toBeUndefined();

        expect(another_response.status).toBe(200);
        expect(another_response.body.length).toBeGreaterThanOrEqual(1);
        expect(another_response.body.find((el: GetByIdResponse) => el.name === another_account.name)).not.toBeUndefined();
    });

    test('Should don`t insert account with same name', async () => {
        const account = { name: 'Duplicate Name' };

        const response = await request.post(URL)
            .set('authorization', `JWT ${USER.token}`)
            .send(account);

        const duplicateResponse = await request.post(URL)
            .set('authorization', `JWT ${USER.token}`)
            .send(account);

        expect(response.status).toBe(201);
        expect(response.body.name).toBe(account.name);

        expect(duplicateResponse.status).toBe(400);
        expect(duplicateResponse.body).toHaveProperty('error');
        expect(duplicateResponse.body.error).toContain('existente');
    });

    test('Should don`t show account with other user_id', async () => {
        const account = { name: 'NameTheUserOne' };

        const response = await request.post(URL)
            .set('authorization', `JWT ${USER.token}`)
            .send(account);

        const responseAnotherUser = await request.get(`${URL}/${response.body.id}`)
            .set('authorization', `JWT ${ANOTHER_USER.token}`)
            .send(account);

        expect(responseAnotherUser.status).toBe(403);
        expect(responseAnotherUser.body).toHaveProperty('error');
        expect(responseAnotherUser.body.error).toContain('não pertence');
    });
})