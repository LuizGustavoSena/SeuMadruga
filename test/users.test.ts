import app from '@src/app';
import supertest from 'supertest';

const request = supertest(app);

describe('Users', () => {
    test('Should be list users', async () => {
        const response = await request.get('/users');

        expect(response.status).toBe(200);
        expect(response.body.length).toBe(1);
        expect(response.body[0]).toHaveProperty('name', 'John Doe');
    });
});