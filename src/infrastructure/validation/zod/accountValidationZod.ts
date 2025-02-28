import { ValidationError } from "@src/domain/error/validationError";
import { CreateProps } from "@src/domain/models/account";
import { AccountValidation } from "@src/domain/validations/account";
import { z, ZodError } from "zod";

export default class AccountValidationZod implements AccountValidation {
    validation = z.object({
        name: z.string({ required_error: 'Campo name deve ser preenchido' })
    });
    constructor() { };

    createOrUpdateAccount(params: CreateProps): void {
        try {
            this.validation.parse(params)
        } catch (error: any) {
            if (!(error instanceof ZodError)) return;

            throw new ValidationError(error.errors.map(el => el.message).join(', '))
        }
    }
}