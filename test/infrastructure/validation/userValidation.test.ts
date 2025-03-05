import { faker } from "@faker-js/faker/.";
import { ValidationError } from "@src/domain/error/validationError";
import { UserMessageError, UserRequiredError } from "@src/domain/validations/user";
import UserValidationZod from "@src/infrastructure/validation/zod/userValidationZod";
import { makeUser } from "@test/data/mocks/insertUser";

const makeSut = (): UserValidationZod => {
    const sut = new UserValidationZod();

    return sut;
}

describe('UserValidation', () => {
    test('Should be error when create user without name', () => {
        const sut = makeSut();

        const request = makeUser();
        // @ts-expect-error
        delete request.name;

        expect(() => sut.create(request)).toThrow(new ValidationError(UserRequiredError.NAME));
    });

    test('Should be error when create user without email', () => {
        const sut = makeSut();

        const request = makeUser();
        // @ts-expect-error
        delete request.email;

        expect(() => sut.create(request)).toThrow(new ValidationError(UserRequiredError.EMAIL));
    });

    test('Should be error when create user without password', () => {
        const sut = makeSut();

        const request = makeUser();
        // @ts-expect-error
        delete request.password;

        expect(() => sut.create(request)).toThrow(new ValidationError(UserRequiredError.PASSWORD));
    });

    test('Should be error when create user with wrong email', () => {
        const sut = makeSut();

        const request = makeUser({ email: faker.string.uuid() });

        expect(() => sut.create(request)).toThrow(new ValidationError(UserMessageError.EMAIL));
    });

    test('Should be error when create user with small password', () => {
        const sut = makeSut();

        const request = makeUser({ password: faker.internet.password().slice(0, 4) });

        expect(() => sut.create(request)).toThrow(new ValidationError(UserMessageError.PASSWORD));
    });
});