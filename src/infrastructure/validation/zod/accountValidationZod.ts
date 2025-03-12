import { ValidationError } from "@src/domain/error/validationError";
import { CreateProps, UpdateParams } from "@src/domain/models/account";
import { AccountMessageError, AccountRequiredError, AccountValidation } from "@src/domain/validations/account";
import { z, ZodError } from "zod";

export default class AccountValidationZod implements AccountValidation {
    validation = z.object({
        name: z.string({ required_error: AccountRequiredError.NAME })
    });

    validationId = z.number({ message: AccountMessageError.ID });

    constructor() { }

    create(params: CreateProps): void {
        try {
            this.validation.parse(params)
        } catch (error: any) {
            if (!(error instanceof ZodError)) return;

            throw new ValidationError(error.errors.map(el => el.message).join(', '))
        }
    }

    update(params: UpdateParams): void {
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