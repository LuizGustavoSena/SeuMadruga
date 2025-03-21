import { faker } from "@faker-js/faker/.";
import BcryptEncrypt from "@src/infrastructure/encrypt/bcrypt";

const sut = new BcryptEncrypt();

describe('BcryptEncrypt', () => {
    test('Should be successfull create encrypt', async () => {
        const password = faker.internet.password();

        const response = await sut.create(password);

        expect(response).not.toBe(password);
        expect(response.length).not.toBe(password.length);
        expect(response).not.toContain(password);
    });
});