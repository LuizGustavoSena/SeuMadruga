import { ValidationError } from "@src/domain/error/validationError";
import { TransferRequiredError } from "@src/domain/validations/transfer";
import TransferValidationZod from "@src/infrastructure/validation/zod/transferValidationZod";
import { makeTransfer } from "@test/data/mocks/insertTransfer";

const makeSut = (): TransferValidationZod => {
    const sut = new TransferValidationZod();

    return sut;
}

describe('TransferValidation', () => {
    test('Should be error when create transfer without description', () => {
        const sut = makeSut();

        const request = makeTransfer();

        // @ts-expect-error
        delete request.description;

        expect(() => sut.create(request)).toThrow(new ValidationError(TransferRequiredError.DESCRIPTION));
    })
})