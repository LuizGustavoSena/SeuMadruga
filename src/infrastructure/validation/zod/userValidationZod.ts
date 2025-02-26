import { ValidationError } from "@src/domain/error/validationError";
import { UserProps } from "@src/domain/models/user";
import { UserMessageError, UserRequiredError, UserValidation } from "@src/domain/validations/user";
import { z, ZodError } from "zod";

export default class UserValidationZod implements UserValidation {
    validation = z.object({
        name: z.string({ required_error: UserRequiredError.NAME }),
        email: z.string({ required_error: UserRequiredError.EMAIL }).email({ message: UserMessageError.EMAIL }),
        password: z.string({ required_error: UserRequiredError.PASSWORD }).min(5, { message: UserMessageError.PASSWORD })
    });

    constructor() { };

    create(params: UserProps): void {
        try {
            this.validation.parse(params)
        } catch (error: any) {
            if (!(error instanceof ZodError)) return;

            throw new ValidationError(error.errors.map(el => el.message).join(', '))
        }
    }
}