import AuthService from "@src/data/use-cases/auth";
import MakeEncrypt from "../encrypt/makeEncrypt";
import MakeJwt from "../jwt/makeJwt";
import MakeUserService from "./makeUserService";

export default class MakeAuthService {
    private static instance: AuthService;

    private constructor() { }

    static getInstance(): AuthService {
        if (!MakeAuthService.instance) {
            const userService = MakeUserService.getInstance();
            const encrypt = MakeEncrypt.getInstance();
            const jwt = MakeJwt.getInstance();

            MakeAuthService.instance = new AuthService(
                userService,
                encrypt,
                jwt
            );
        }

        return MakeAuthService.instance;
    }
}