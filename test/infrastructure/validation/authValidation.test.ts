import { faker } from "@faker-js/faker/.";
import AuthService from "@src/data/use-cases/auth";
import UserService from "@src/data/use-cases/user";
import { ValidationError } from "@src/domain/error/validationError";
import { AuthMessageError, AuthRequiredError } from "@src/domain/validations/auth";
import AuthValidationZod from "@src/infrastructure/validation/zod/authValidationZod";
import UserValidationZod from "@src/infrastructure/validation/zod/userValidationZod";
import DatabaseSpy from "@test/data/mocks/databaseSpy";
import MakeEncryptSpy from "@test/data/mocks/encryptSpy";
import JwtSpy from "@test/data/mocks/jwtSpy";

const makeSut = (): AuthService => {
    const encrypt = MakeEncryptSpy.getInstance();
    const sut = new AuthService(
        new UserService(new DatabaseSpy(), encrypt, new UserValidationZod()),
        encrypt,
        new JwtSpy(),
        new AuthValidationZod())
        ;

    return sut;
}

describe('AuthValidation', () => {
    test('Should be error when signin without email', async () => {
        const sut = makeSut();

        const request = { password: faker.internet.password() };

        // @ts-expect-error
        const promise = sut.signin(request);

        await expect(promise).rejects.toThrow(new ValidationError(AuthRequiredError.EMAIL));
    });

    test('Should be error when signin without password', async () => {
        const sut = makeSut();

        const request = { email: faker.internet.email() };

        // @ts-expect-error
        const promise = sut.signin(request);

        await expect(promise).rejects.toThrow(new ValidationError(AuthRequiredError.PASSWORD));
    });

    test('Should be error when signin wrong email', async () => {
        const sut = makeSut();

        const request = { email: faker.string.uuid(), password: faker.internet.password() };

        const promise = sut.signin(request);

        await expect(promise).rejects.toThrow(new ValidationError(AuthMessageError.EMAIL));
    });

    test('Should be error when signin wrong password', async () => {
        const sut = makeSut();

        const request = { email: faker.internet.email(), password: faker.internet.password().slice(0, 3) };

        const promise = sut.signin(request);

        await expect(promise).rejects.toThrow(new ValidationError(AuthMessageError.PASSWORD));
    });
});