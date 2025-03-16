import { FindByEmailResponse, UserProps } from "@src/domain/models/user";
import KnexDatabase from "@src/infrastructure/database/knex";
import { makeUser } from "@test/data/mocks/insertUser";

const sut: KnexDatabase = new KnexDatabase('users');

describe('KnexDatabase', () => {
    beforeAll(async () => {
        await sut.db.migrate.latest();
        await sut.create<UserProps, FindByEmailResponse>(makeUser());
    });

    afterAll(async () => {
        await sut.db.destroy();
    });

    test('Should be successful create object', async () => {
        const user = makeUser();

        const response = await sut.create<UserProps, FindByEmailResponse>(user);

        expect(response).toHaveProperty('id');
        expect(response.email).toBe(user.email);
        expect(response.name).toBe(user.name);
        expect(response.password).toBe(user.password);
    });

    test('Should be successful getAll objects', async () => {
        const response = await sut.getAll<FindByEmailResponse[]>();

        expect(response).toHaveLength(2);
    });

    test('Should be successful getByFilter objects', async () => {
        const user = makeUser();

        await sut.create<UserProps, FindByEmailResponse>(user);

        const response = await sut.getByFIlter<FindByEmailResponse[]>({ name: user.name });

        expect(response).toHaveLength(1);
        expect(response[0]).toHaveProperty('id');
        expect(response[0].email).toBe(user.email);
        expect(response[0].name).toBe(user.name);
        expect(response[0].password).toBe(user.password);
    });
});