import app from '@src/app';
import supertest from 'supertest';

const request = supertest(app);

describe('App', () => {
    test('Should be run successful', async () => {
        const response = await request.get('/');

        expect(response.status).toBe(200);
    });
});