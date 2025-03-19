import { faker } from "@faker-js/faker/.";
import { ValidationError } from "@src/domain/error/validationError";
import { AccountRequiredError } from "@src/domain/validations/account";
import AccountValidationZod from "@src/infrastructure/validation/zod/accountValidationZod";
import { makeAccount } from "@test/domain/mocks/insertAccount";

const makeSut = (): AccountValidationZod => {
    const sut = new AccountValidationZod();

    return sut;
}

describe('AccountValidation', () => {
    test('Should be error when create account without name', () => {
        const sut = makeSut();

        const request = makeAccount();
        // @ts-expect-error
        delete request.name;

        expect(() => sut.create(request)).toThrow(new ValidationError(AccountRequiredError.NAME));
    });

    test('Should be error when update account without name', () => {
        const sut = makeSut();

        // @ts-expect-error
        expect(() => sut.update({ id: faker.number.int() })).toThrow(new ValidationError(AccountRequiredError.NAME));
    });
});