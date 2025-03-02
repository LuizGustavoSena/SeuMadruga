import { faker } from "@faker-js/faker/.";
import AccountService from "@src/data/use-cases/account";
import TransactionService from "@src/data/use-cases/transaction";
import { ValidationError } from "@src/domain/error/validationError";
import { AccountRequiredError } from "@src/domain/validations/account";
import AccountValidationZod from "@src/infrastructure/validation/zod/accountValidationZod";
import DatabaseSpy from "@test/data/mocks/databaseSpy";
import { makeAccount } from "@test/data/mocks/insertAccount";
import TransactionDatabaseSpy from "@test/data/mocks/transactionDatabaseSpy";

const makeSut = (): AccountService => {
    const sut = new AccountService(new TransactionService(new TransactionDatabaseSpy()), new DatabaseSpy(), new AccountValidationZod())

    return sut;
}

describe('AccountValidation', () => {
    test('Should be error when create account without name', async () => {
        const sut = makeSut();

        const request = makeAccount();
        // @ts-expect-error
        delete request.name;

        const promise = sut.create(request);

        await expect(promise).rejects.toThrow(new ValidationError(AccountRequiredError.NAME));
    });

    test('Should be error when update account without name', async () => {
        const sut = makeSut();

        // @ts-expect-error
        const promise = sut.update({ id: faker.number.int() });

        await expect(promise).rejects.toThrow(new ValidationError(AccountRequiredError.NAME));
    });
});