import { EncodeProps, Jwt } from "../protocols/jwt/jwt";

export default class JwtSpy implements Jwt {
    params: EncodeProps;
    response: string;
    constructor() { };

    encode(params: EncodeProps): string {
        this.params = params;

        return this.response;
    }
}