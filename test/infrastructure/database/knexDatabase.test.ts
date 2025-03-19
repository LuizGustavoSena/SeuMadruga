import { faker } from "@faker-js/faker/.";
import { FindByEmailResponse, UserProps } from "@src/domain/models/user";
import KnexDatabase from "@src/infrastructure/database/knex";
import { makeUser } from "@test/domain/mocks/insertUser";

const sut: KnexDatabase = new KnexDatabase('users');

describe('KnexDatabase', () => {
    let auxiliarUser: UserProps & { id?: number } = makeUser();

    beforeAll(async () => {
        await sut.db.migrate.latest();
        const response = await sut.create<UserProps, FindByEmailResponse>(auxiliarUser);

        auxiliarUser.id = response.id;
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
        const response = await sut.getByFIlter<FindByEmailResponse[]>({ name: auxiliarUser.name });

        expect(response).toHaveLength(1);
        expect(response[0]).toHaveProperty('id');
        expect(response[0].email).toBe(auxiliarUser.email);
        expect(response[0].name).toBe(auxiliarUser.name);
        expect(response[0].password).toBe(auxiliarUser.password);
    });

    test('Should be successful update object', async () => {
        const newName = faker.person.firstName();

        const response = await sut.update<FindByEmailResponse>({
            id: auxiliarUser.id ?? 0,
            data: { name: newName }
        });

        expect(response.id).toBe(auxiliarUser.id);
        expect(response.name).toBe(newName);
        expect(response.email).toBe(auxiliarUser.email);
        expect(response.password).toBe(auxiliarUser.password);
    });

    test('Should be successful delete object', async () => {
        await sut.deleteById(auxiliarUser.id ?? 0);

        const response = await sut.getByFIlter<FindByEmailResponse[]>({ name: auxiliarUser.name });

        expect(response).toHaveLength(0);
    });
});