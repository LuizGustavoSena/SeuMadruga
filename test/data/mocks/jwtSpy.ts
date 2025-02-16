import { EncodeProps, Jwt } from "../protocols/jwt/jwt";

export default class JwtSpy implements Jwt {
    constructor() { };

    encode(params: EncodeProps): string {
        return JSON.stringify(params);
    }
}