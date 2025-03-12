import { ValidationError } from "@src/domain/error/validationError";
import { CreateTransfer } from "@src/domain/models/transfer";
import { TransferMessageError, TransferRequiredError, TransferValidation } from "@src/domain/validations/transfer";
import { z, ZodError } from "zod";

export default class TransferValidationZod implements TransferValidation {
    validation = z.object({
        description: z.string({ required_error: TransferRequiredError.DESCRIPTION }),
        ammount: z.number({ required_error: TransferRequiredError.AMMOUNT }),
        acc_ori_id: z.number({ required_error: TransferRequiredError.ACC_ORI_ID }),
        acc_dest_id: z.number({ required_error: TransferRequiredError.ACC_DEST_ID }),
    }).refine(data => data.acc_ori_id !== data.acc_dest_id, { message: TransferMessageError.ACC_ORI_ID_EQUAL_ACC_DEST_ID });

    validationId = z.number({ message: TransferMessageError.ID });

    create(params: CreateTransfer): void {
        try {
            this.validation.parse(params);
        } catch (error: any) {
            if (!(error instanceof ZodError)) return;

            throw new ValidationError(error.errors.map(el => el.message).join(', '))
        }
    }

    id(id: number): void {
        try {
            this.validationId.parse(id);
        } catch (error: any) {
            if (!(error instanceof ZodError)) return;

            throw new ValidationError(error.errors.map(el => el.message).join(', '))
        }
    }
}