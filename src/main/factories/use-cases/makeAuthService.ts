import AuthService from "@src/data/use-cases/auth";
import MakeEncrypt from "../encrypt/makeEncrypt";
import MakeJwt from "../jwt/makeJwt";
import MakeUserService from "./makeUserService";

export default class MakeAuthService {
    private static instance: AuthService;

    private constructor() { }

    static getInstance(): AuthService {
        if (!MakeAuthService.instance)
            MakeAuthService.instance = new AuthService(MakeUserService.getInstance(), MakeEncrypt.getInstance(), MakeJwt.getInstance());

        return MakeAuthService.instance;
    }
}