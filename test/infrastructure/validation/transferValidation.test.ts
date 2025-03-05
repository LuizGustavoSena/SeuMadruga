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
    });

    test('Should be error when create transfer without ammount', () => {
        const sut = makeSut();

        const request = makeTransfer();

        // @ts-expect-error
        delete request.ammount;

        expect(() => sut.create(request)).toThrow(new ValidationError(TransferRequiredError.AMMOUNT));
    });

    test('Should be error when create transfer without acc_ori_id', () => {
        const sut = makeSut();

        const request = makeTransfer();

        // @ts-expect-error
        delete request.acc_ori_id;

        expect(() => sut.create(request)).toThrow(new ValidationError(TransferRequiredError.ACC_ORI_ID));
    });

    test('Should be error when create transfer without acc_dest_id', () => {
        const sut = makeSut();

        const request = makeTransfer();

        // @ts-expect-error
        delete request.acc_dest_id;

        expect(() => sut.create(request)).toThrow(new ValidationError(TransferRequiredError.ACC_DEST_ID));
    });
})