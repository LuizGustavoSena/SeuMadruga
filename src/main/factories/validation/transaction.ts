import { TransactionValidation } from "@src/domain/validations/transaction";
import TransactionValidationZod from "@src/infrastructure/validation/zod/transactionValidationZod";

export default class MakeTransactionValidation {
    private static instance: TransactionValidation;

    static getInstance(): TransactionValidation {
        if (!MakeTransactionValidation.instance)
            MakeTransactionValidation.instance = new TransactionValidationZod();

        return MakeTransactionValidation.instance;
    }
}