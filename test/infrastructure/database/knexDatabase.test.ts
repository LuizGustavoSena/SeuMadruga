import { UserProps } from "@src/domain/models/user";
import KnexDatabase from "@src/infrastructure/database/knex";
import { makeUser } from "@test/data/mocks/insertUser";

const sut: KnexDatabase = new KnexDatabase('users');

describe('KnexDatabase', () => {
    beforeAll(async () => {
        await sut.db.migrate.latest();
    });

    afterAll(async () => {
        await sut.db.destroy();
    });

    test('Should be successful create object', async () => {
        const user = makeUser();

        const response = await sut.create<UserProps, UserProps & { id: number }>(user);

        expect(response).toHaveProperty('id');
        expect(response.email).toBe(user.email);
        expect(response.name).toBe(user.name);
        expect(response.password).toBe(user.password);
    });

    test('Should be successful getAll objects', async () => {
        const response = await sut.getAll<UserProps & { id: number }[]>();

        expect(response).toHaveLength(1);
    });
});