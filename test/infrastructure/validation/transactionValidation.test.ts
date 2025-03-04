import { ValidationError } from "@src/domain/error/validationError";
import { TransactionRequiredError } from "@src/domain/validations/transaction";
import TransactionValidationZod from "@src/infrastructure/validation/zod/transactionValidationZod";
import { makeTransaction } from "@test/data/mocks/insertTransaction";

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
});