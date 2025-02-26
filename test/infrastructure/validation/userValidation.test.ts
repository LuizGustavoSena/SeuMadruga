import UserService from "@src/data/use-cases/user";
import { ValidationError } from "@src/domain/error/validationError";
import { UserRequiredError } from "@src/domain/validations/user";
import UserValidationZod from "@src/infrastructure/validation/zod/userValidationZod";
import DatabaseSpy from "@test/data/mocks/databaseSpy";
import { EncryptSpy } from "@test/data/mocks/encryptSpy";
import { makeUser } from "@test/data/mocks/insertUser";

const makeSut = (): UserService => {
    const sut = new UserService(new DatabaseSpy(), new EncryptSpy(), new UserValidationZod())

    return sut;
}

describe('UserValidation', () => {
    test('Should be error when create user without name', async () => {
        const sut = makeSut();

        const request = makeUser();
        // @ts-expect-error
        delete request.name;

        const promise = sut.save(request);

        await expect(promise).rejects.toThrow(new ValidationError(UserRequiredError.NAME));
    });

    test('Should be error when create user without email', async () => {
        const sut = makeSut();

        const request = makeUser();
        // @ts-expect-error
        delete request.email;

        const promise = sut.save(request);

        await expect(promise).rejects.toThrow(new ValidationError(UserRequiredError.EMAIL));
    });

    test('Should be error when create user without password', async () => {
        const sut = makeSut();

        const request = makeUser();
        // @ts-expect-error
        delete request.password;

        const promise = sut.save(request);

        await expect(promise).rejects.toThrow(new ValidationError(UserRequiredError.PASSWORD));
    });
});