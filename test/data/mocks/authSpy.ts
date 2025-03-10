import { SigninParams, SigninResponse } from "@src/domain/models/auth";
import { Auth } from "@src/domain/use-cases/auth";

export default class AuthSpy implements Auth {
    params?: SigninParams;

    constructor(){};

    async signin(params: SigninParams): Promise<SigninResponse> {
        this.params = params;

        return {
            token: JSON.stringify(this.params)
        }
    }
}