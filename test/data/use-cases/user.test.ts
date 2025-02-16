import UserService from "@src/data/use-cases/user";
import DatabaseSpy from "../mocks/database";
import MakeEncryptSpy, { EncryptSpy } from "../mocks/encrypt";
import { makeUser } from "../mocks/insertUser";

type Props = {
    sut: UserService;
    databaseSpy: DatabaseSpy;
    encryptSpy: EncryptSpy
}
const makeSut = (): Props => {
    const databaseSpy = new DatabaseSpy();
    const encryptSpy = MakeEncryptSpy.getInstance();
    const sut = new UserService(databaseSpy, encryptSpy);

    return {
        sut,
        databaseSpy,
        encryptSpy
    }
}

describe('User', () => {
    test('Should be correct save user', async () => {
        const { databaseSpy, encryptSpy, sut } = makeSut();

        const user = makeUser();

        const response = await sut.save(user);

        expect(response.email).toBe(user.email);
        expect(response.name).toBe(user.name);
        expect(databaseSpy.content[0].email).toBe(user.email);
        expect(databaseSpy.content[0].name).toBe(user.name);
        expect(databaseSpy.content[0].password).toBe(`${encryptSpy.encryptText}${user.password}`);
        expect(response).toHaveProperty('id');
    });

    test('Should be error when create a user with exist email', async () => {
        const { databaseSpy, sut } = makeSut();

        const email = faker.internet.email();

        databaseSpy.content.push(makeUser({ email }));

        const user = makeUser({ email });

        const promise = sut.save(user);

        await expect(promise).rejects.toThrow(new ExistingEmailError())
    });
});