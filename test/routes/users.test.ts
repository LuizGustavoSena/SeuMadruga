import app from '@src/app';
import supertest from 'supertest';

const request = supertest(app);

describe('Users', () => {
    test('Should be list users', async () => {
        const response = await request.get('/users');

        expect(response.status).toBe(200);
        expect(response.body.length).toBeGreaterThan(0);
    });

    test('Should be create a user', async () => {
        const props = { name: 'Walter Mitty', email: `${Date.now()}@email.com`, password: '12354' };

        const response = await request.post('/users').send(props);

        expect(response.status).toBe(201);
        expect(response.body.name).toBe(props.name);
    });

    test('Should be error in password less than required when create a user', async () => {
        const props = { name: 'Walter Mitty', email: `${Date.now()}@email.com`, password: '123' };

        const response = await request.post('/users').send(props);

        expect(response.status).toBe(400);
        expect(response.body.error).toContain('password');
    });

    test('Should be error in don`t send password when create a user', async () => {
        const props = { name: 'Walter Mitty', email: `${Date.now()}@email.com` };

        const response = await request.post('/users').send(props);

        expect(response.status).toBe(400);
        expect(response.body.error).toContain('password');
    });

    test('Should be error in don`t send email when create a user', async () => {
        const props = { name: 'Walter Mitty', password: '12345' };

        const response = await request.post('/users').send(props);

        expect(response.status).toBe(400);
        expect(response.body.error).toContain('email');
    });

    test('Should be error in send email in format error when create a user', async () => {
        const props = { name: 'Walter Mitty', email: `${Date.now()}@emailcom`, password: '12345' };

        const response = await request.post('/users').send(props);

        expect(response.status).toBe(400);
        expect(response.body.error).toContain('email');
    });

    test('Should be error in don`t send name when create a user', async () => {
        const props = { email: `${Date.now()}@email.com`, password: '12345' };

        const response = await request.post('/users').send(props);

        expect(response.status).toBe(400);
        expect(response.body.error).toContain('name');
    });

    test('Should be error in send same emael when create a user', async () => {
        const props = { name: 'Walter Mitty', email: `${Date.now()}@email.com`, password: '12345' };

        await request.post('/users').send(props);
        const response = await request.post('/users').send(props);

        expect(response.status).toBe(400);
        expect(response.body.error).toContain('existente');
    });
});