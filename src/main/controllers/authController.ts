import AuthService from "@src/data/use-cases/auth";
import UserService from "@src/data/use-cases/user";
import { AuthValidation } from "@src/domain/validations/auth";
import { UserValidation } from "@src/domain/validations/user";
import { NextFunction, Request, Response } from 'express';

export default class AuthController {
    constructor(
        private authService: AuthService,
        private userService: UserService,
        private authValidation: AuthValidation,
        private userValidation: UserValidation
    ) { };

    async login(req: Request, res: Response, next: NextFunction) {
        try {
            this.authValidation.signin(req.body);

            const response = await this.authService.signin(req.body);

            res.status(201).send(response);
        } catch (error: any) {
            next(error);
        }
    }

    async create(req: Request, res: Response, next: NextFunction) {
        try {
            this.userValidation.create(req.body);

            const response = await this.userService.save(req.body);

            res.status(201).send(response);
        } catch (error: any) {
            next(error);
        }
    }
}