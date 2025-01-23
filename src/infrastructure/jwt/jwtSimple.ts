import 'dotenv/config';
import { EncodeProps, Jwt } from "../models/jwt";

const jwt = require('jwt-simple');

export default class JwtSimpleJwt implements Jwt {
    constructor() { }

    encode(params: EncodeProps): string {
        const token = jwt.encode(params, process.env.SECRET);

        return token;
    }
}