import { Encrypt } from "@src/data/protocols/encrypt/encrypt";
import { Jwt } from "@src/data/protocols/jwt/jwt";
import { UserNotFoundError } from "@src/domain/error/userNotFoundError";
import { SigninParams, SigninResponse } from "@src/domain/models/auth";
import { Auth } from "@src/domain/use-cases/auth";
import UserService from "./user";

export default class AuthService implements Auth {
    constructor(
        private readonly userService: UserService,
        private readonly encrypt: Encrypt,
        private readonly jwt: Jwt
    ) { };

    async signin(params: SigninParams): Promise<SigninResponse> {
        const user = await this.userService.findByEmail(params.email);

        if (!user)
            throw new UserNotFoundError();

        const samePassword = await this.encrypt.compare(params.password, user.password);

        if (!samePassword)
            throw new UserNotFoundError();

        const response = {
            id: user.id,
            email: user.email,
            name: user.name
        }

        const token = this.jwt.encode(response);

        return { token };
    }
}