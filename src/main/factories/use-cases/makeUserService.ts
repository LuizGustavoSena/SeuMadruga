import UserService from "@src/data/use-cases/user";
import MakeDatabase from "../database/makeDatabase";
import MakeEncrypt from "../encrypt/makeEncrypt";
import MakeUserValidation from "../validation/user";

export default class MakeUserService {
    private static instance: UserService;

    private constructor() { }

    static getInstance(): UserService {
        if (!MakeUserService.instance) {
            const database = MakeDatabase.getInstance('users');
            const encrypt = MakeEncrypt.getInstance();
            const validation = MakeUserValidation.getInstance();

            MakeUserService.instance = new UserService(database, encrypt, validation);
        }

        return MakeUserService.instance;
    }
}