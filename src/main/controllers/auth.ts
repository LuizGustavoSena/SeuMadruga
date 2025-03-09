import AuthService from "@src/data/use-cases/auth";
import UserService from "@src/data/use-cases/user";
import { ValidationError } from "@src/domain/error/validationError";
import { Request, Response } from 'express';

export default class AuthController {
    constructor(
        private authService: AuthService,
        private userService: UserService
    ) { };

    async login(req: Request, res: Response) {
        try {
            const response = await this.authService.signin(req.body);

            res.status(201).send(response);
        } catch (error: any) {
            if (error instanceof ValidationError) {
                res.status(400).send({ error: error.message });
                return;
            }

            res.status(500).send();
        }
    }

    async create(req: Request, res: Response) {
        try {
            const response = await this.userService.save(req.body);

            res.status(201).send(response);
        } catch (error: any) {
            if (error instanceof ValidationError) {
                res.status(400).send({ error: error.message });
                return;
            }

            res.status(500).send();
        }
    }
}