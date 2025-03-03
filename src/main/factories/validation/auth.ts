import { AuthValidation } from "@src/domain/validations/auth";
import AuthValidationZod from "@src/infrastructure/validation/zod/authValidationZod";

export default class MakeAuthValidation {
    private static instance: AuthValidation;

    static getInstance(): AuthValidation {
        if (!MakeAuthValidation.instance)
            MakeAuthValidation.instance = new AuthValidationZod();

        return MakeAuthValidation.instance;
    }
}