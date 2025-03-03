import { ValidationError } from "@src/domain/error/validationError";
import { SigninParams } from "@src/domain/models/auth";
import { AuthMessageError, AuthRequiredError, AuthValidation } from "@src/domain/validations/auth";
import { z, ZodError } from "zod";

export default class AuthValidationZod implements AuthValidation {
    validation = z.object({
        email: z.string({ required_error: AuthRequiredError.EMAIL }).email({ message: AuthMessageError.EMAIL }),
        password: z.string({ required_error: AuthRequiredError.PASSWORD }).min(5, { message: AuthMessageError.PASSWORD })
    });

    constructor() { }

    signin(params: SigninParams): void {
        try {
            this.validation.parse(params)
        } catch (error: any) {
            if (!(error instanceof ZodError)) return;

            throw new ValidationError(error.errors.map(el => el.message).join(', '))
        }
    };
}