import { AccountValidation } from "@src/domain/validations/account";
import AccountValidationZod from "@src/infrastructure/validation/zod/accountValidationZod";

export default class MakeAccountValidation {
    private static instance: AccountValidation;

    static getInstance(): AccountValidation {
        if (!MakeAccountValidation.instance)
            MakeAccountValidation.instance = new AccountValidationZod();

        return MakeAccountValidation.instance;
    }
}