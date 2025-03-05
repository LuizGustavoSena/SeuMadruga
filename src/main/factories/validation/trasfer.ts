import { TransferValidation } from "@src/domain/validations/transfer";
import TransferValidationZod from "@src/infrastructure/validation/zod/transferValidationZod";

export default class MakeTransferValidation {
    private static instance: TransferValidation;

    static getInstance(): TransferValidation {
        if (!MakeTransferValidation.instance)
            MakeTransferValidation.instance = new TransferValidationZod();

        return MakeTransferValidation.instance;
    }
}