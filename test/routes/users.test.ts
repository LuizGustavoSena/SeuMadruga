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
        const props = { name: 'Walter Mitty', email: `${Date.now()}@email.com`, password: '123' };

        const response = await request.post('/users').send(props);

        expect(response.status).toBe(201);
        expect(response.body[0].name).toBe(props.name);
    });
});