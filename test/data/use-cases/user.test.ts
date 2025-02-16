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
        const { sut } = makeSut();

        const user = makeUser();

        const response = await sut.save(user);

        expect(response.email).toBe(user.email);
        expect(response.name).toBe(user.name);
        expect(response).toHaveProperty('id');
    });
});