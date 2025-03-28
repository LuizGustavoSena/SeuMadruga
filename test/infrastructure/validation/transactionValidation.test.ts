import { faker } from "@faker-js/faker/.";
import { ValidationError } from "@src/domain/error/validationError";
import { Type } from "@src/domain/models/transaction";
import { TransactionMessageError, TransactionRequiredError } from "@src/domain/validations/transaction";
import TransactionValidationZod from "@src/infrastructure/validation/zod/transactionValidationZod";
import { makeTransaction } from "@test/domain/mocks/insertTransaction";

const makeSut = (): TransactionValidationZod => {
    return new TransactionValidationZod();
}

describe('TransactionValidation', () => {
    test('Should be erro when create transaction without description', async () => {
        const sut = makeSut();

        const transaction = makeTransaction();

        // @ts-expect-error
        delete transaction.description;

        expect(() => sut.create(transaction)).toThrow(new ValidationError(TransactionRequiredError.DESCRIPTION));
    });

    test('Should be erro when create transaction without acc_id', async () => {
        const sut = makeSut();

        const transaction = makeTransaction();

        // @ts-expect-error
        delete transaction.acc_id;

        expect(() => sut.create(transaction)).toThrow(new ValidationError(TransactionRequiredError.ACC_ID));
    });

    test('Should be erro when create transaction without type', async () => {
        const sut = makeSut();

        const transaction = makeTransaction();

        // @ts-expect-error
        delete transaction.type;

        expect(() => sut.create(transaction)).toThrow(new ValidationError(TransactionMessageError.TYPE));
    });

    test('Should be erro when create transaction without ammount', async () => {
        const sut = makeSut();

        const transaction = makeTransaction();

        // @ts-expect-error
        delete transaction.ammount;

        expect(() => sut.create(transaction)).toThrow(new ValidationError(TransactionRequiredError.AMMOUNT));
    });

    test('Should be erro when create transaction with input type and negative ammount', async () => {
        const sut = makeSut();

        const transaction = makeTransaction({
            type: Type.INPUT,
            ammount: faker.number.float() * -1
        });

        expect(() => sut.create(transaction)).toThrow(new ValidationError(TransactionMessageError.POSITIVE_AMMOUNT));
    });

    test('Should be erro when create transaction with output type and positive ammount', async () => {
        const sut = makeSut();

        const transaction = makeTransaction({
            type: Type.OUTPUT,
            ammount: faker.number.float()
        });

        expect(() => sut.create(transaction)).toThrow(new ValidationError(TransactionMessageError.NEGATIVE_AMMOUNT));
    });
});