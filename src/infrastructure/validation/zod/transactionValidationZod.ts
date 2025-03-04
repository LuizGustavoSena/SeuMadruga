import { ValidationError } from "@src/domain/error/validationError";
import { CreateProps, Type } from "@src/domain/models/transaction";
import { TransactionMessageError, TransactionRequiredError, TransactionValidation } from "@src/domain/validations/transaction";
import { z, ZodError } from "zod";

export default class TransactionValidationZod implements TransactionValidation {
    inputType = z.object({
        ammount: z.number({ required_error: TransactionRequiredError.AMMOUNT }).positive({ message: TransactionMessageError.POSITIVE_AMMOUNT })
    });

    outputType = z.object({
        ammount: z.number({ required_error: TransactionRequiredError.AMMOUNT }).negative({ message: TransactionMessageError.NEGATIVE_AMMOUNT })
    });

    validation = z.object({
        description: z.string({ required_error: TransactionRequiredError.DESCRIPTION }),
        acc_id: z.number({ required_error: TransactionRequiredError.ACC_ID }),
        type: z.nativeEnum(Type, { required_error: TransactionRequiredError.TYPE, message: TransactionMessageError.TYPE }),
    });

    constructor() { };

    create(params: CreateProps): void {
        try {
            this.validation.merge(params.type === Type.INPUT ? this.inputType : this.outputType)

            this.validation.parse(params);
        } catch (error) {
            if (!(error instanceof ZodError)) return;

            throw new ValidationError(error.errors.map(el => el.message).join(', '))
        }
    }
}