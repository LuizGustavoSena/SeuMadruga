import UserService from "@src/data/use-cases/user";
import MakeDatabase from "../database/makeDatabase";
import MakeEncrypt from "../encrypt/makeEncrypt";

export default class MakeUserService {
    private static instance: UserService;

    private constructor() { }

    static getInstance(): UserService {
        if (!MakeUserService.instance)
            MakeUserService.instance = new UserService(MakeDatabase.getInstance('users'), MakeEncrypt.getInstance());

        return MakeUserService.instance;
    }
}