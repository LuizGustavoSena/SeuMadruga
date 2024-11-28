import app from '@src/app';
import supertest from 'supertest';
import UserService from '../services/user';

const URL = '/users';

const request = supertest(app);

const userService = new UserService();

describe('Users', () => {
    test('Should be list users', async () => {
        const response = await request.get(URL);

        expect(response.status).toBe(200);
        expect(response.body.length).toBeGreaterThan(0);
        expect(response.body[0]).not.toHaveProperty('password');
    });

    test('Should be create a user', async () => {
        const props = { name: 'Walter Mitty', email: `${Date.now()}@email.com`, password: '12354' };

        const response = await request.post(URL).send(props);

        expect(response.status).toBe(201);
        expect(response.body.name).toBe(props.name);
        expect(response.body).not.toHaveProperty('password');

        const user = await userService.findByEmail(props.email);

        expect(user.password).not.toBeUndefined();
        expect(user.password).not.toBeNull();
        expect(user.password).not.toBe(props.password);
    });

    test('Should be error in password less than required when create a user', async () => {
        const props = { name: 'Walter Mitty', email: `${Date.now()}@email.com`, password: '123' };

        const response = await request.post(URL).send(props);

        expect(response.status).toBe(400);
        expect(response.body.error).toContain('password');
    });

    test('Should be error in don`t send password when create a user', async () => {
        const props = { name: 'Walter Mitty', email: `${Date.now()}@email.com` };

        const response = await request.post(URL).send(props);

        expect(response.status).toBe(400);
        expect(response.body.error).toContain('password');
    });

    test('Should be error in don`t send email when create a user', async () => {
        const props = { name: 'Walter Mitty', password: '12345' };

        const response = await request.post(URL).send(props);

        expect(response.status).toBe(400);
        expect(response.body.error).toContain('email');
    });

    test('Should be error in send email in format error when create a user', async () => {
        const props = { name: 'Walter Mitty', email: `${Date.now()}@emailcom`, password: '12345' };

        const response = await request.post(URL).send(props);

        expect(response.status).toBe(400);
        expect(response.body.error).toContain('email');
    });

    test('Should be error in don`t send name when create a user', async () => {
        const props = { email: `${Date.now()}@email.com`, password: '12345' };

        const response = await request.post(URL).send(props);

        expect(response.status).toBe(400);
        expect(response.body.error).toContain('name');
    });

    test('Should be error in send same emael when create a user', async () => {
        const props = { name: 'Walter Mitty', email: `${Date.now()}@email.com`, password: '12345' };

        await request.post(URL).send(props);
        const response = await request.post(URL).send(props);

        expect(response.status).toBe(400);
        expect(response.body.error).toContain('existente');
    });
});