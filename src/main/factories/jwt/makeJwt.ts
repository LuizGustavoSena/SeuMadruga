import { Jwt } from "@src/data/protocols/jwt/jwt";
import JwtSimpleJwt from "@src/infrastructure/jwt/jwtSimple";

export default class MakeJwt {
    private static instance: Jwt;

    private constructor() { }

    static getInstance(): Jwt {
        if (!MakeJwt.instance)
            MakeJwt.instance = new JwtSimpleJwt();

        return MakeJwt.instance;
    }
}