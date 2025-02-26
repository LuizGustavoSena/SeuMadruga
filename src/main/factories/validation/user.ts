import { UserValidation } from "@src/domain/validations/user";
import UserValidationZod from "@src/infrastructure/validation/zod/userValidationZod";

export default class MakeUserValidation {
    private static instance: UserValidation;

    static getInstance(): UserValidation {
        if (!MakeUserValidation.instance)
            MakeUserValidation.instance = new UserValidationZod();

        return MakeUserValidation.instance;
    }
}