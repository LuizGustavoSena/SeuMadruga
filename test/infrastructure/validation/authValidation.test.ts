import { faker } from "@faker-js/faker/.";
import { ValidationError } from "@src/domain/error/validationError";
import { AuthMessageError, AuthRequiredError } from "@src/domain/validations/auth";
import AuthValidationZod from "@src/infrastructure/validation/zod/authValidationZod";

const makeSut = (): AuthValidationZod => {
    const sut = new AuthValidationZod();

    return sut;
}

describe('AuthValidation', () => {
    test('Should be error when signin without email', () => {
        const sut = makeSut();

        const request = { password: faker.internet.password() };

        // @ts-expect-error
        expect(() => sut.signin(request)).toThrow(new ValidationError(AuthRequiredError.EMAIL));
    });

    test('Should be error when signin without password', () => {
        const sut = makeSut();

        const request = { email: faker.internet.email() };

        // @ts-expect-error
        expect(() => sut.signin(request)).toThrow(new ValidationError(AuthRequiredError.PASSWORD));
    });

    test('Should be error when signin wrong email', () => {
        const sut = makeSut();

        const request = { email: faker.string.uuid(), password: faker.internet.password() };

        expect(() => sut.signin(request)).toThrow(new ValidationError(AuthMessageError.EMAIL));
    });

    test('Should be error when signin wrong password', () => {
        const sut = makeSut();

        const request = { email: faker.internet.email(), password: faker.internet.password().slice(0, 3) };

        expect(() => sut.signin(request)).toThrow(new ValidationError(AuthMessageError.PASSWORD));
    });
});