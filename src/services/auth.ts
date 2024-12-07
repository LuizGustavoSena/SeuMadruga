import { SigninParams, SigninResponse } from "@src/domain/models/auth";
import 'dotenv/config';
import UserService from "./user";
const bcrypt = require('bcryptjs');
const jwt = require('jwt-simple');

export default class AuthService {
    constructor(
        private readonly userService: UserService
    ) { };

    async signin(params: SigninParams): Promise<SigninResponse> {
        const user = await this.userService.findByEmail(params.email);

        if (!user || !bcrypt.compareSync(params.password, user.password))
            throw new Error('Usuário não encontrado');

        const response = {
            id: user.id,
            email: user.email,
            name: user.name
        }

        const token = jwt.encode(response, process.env.SECRET);

        return { token };
    }
}