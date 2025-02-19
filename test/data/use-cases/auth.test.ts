import { faker } from '@faker-js/faker/.';
import AuthService from '@src/data/use-cases/auth';
import UserService from '@src/data/use-cases/user';
import { UserNotFoundError } from '@src/domain/error/userNotFoundError';
import DatabaseSpy from '../mocks/databaseSpy';
import MakeEncryptSpy, { EncryptSpy } from '../mocks/encryptSpy';
import { makeUser } from '../mocks/insertUser';
import JwtSpy from '../mocks/jwtSpy';

type Props = {
    sut: AuthService;
    userService: UserService;
    jwt: JwtSpy;
    encrypt: EncryptSpy;
    database: DatabaseSpy;
}

const makeSut = (): Props => {
    const database = new DatabaseSpy();
    const encrypt = MakeEncryptSpy.getInstance();
    const jwt = new JwtSpy();

    const userService = new UserService(database, encrypt);

    const sut = new AuthService(userService, encrypt, jwt);

    return {
        sut,
        userService,
        jwt,
        encrypt,
        database
    }
}

describe('Auth', () => {
    test('Should be successful singin', async () => {
        const { database, sut, encrypt, jwt } = makeSut();

        const user = makeUser();
        const id = faker.number.int();
        const responseJwt = faker.string.alphanumeric();

        jwt.response = responseJwt;

        database.content.push({
            ...user,
            password: await encrypt.create(user.password),
            id
        });

        const response = await sut.signin(user);

        expect(jwt.params).toEqual({ id, email: user.email, name: user.name });
        expect(response.token).toBe(responseJwt);
    });

    test('Should be error when singin with no user registered', async () => {
        const { sut } = makeSut();

        const promise = sut.signin(makeUser());

        await expect(promise).rejects.toThrow(new UserNotFoundError());
    });
})