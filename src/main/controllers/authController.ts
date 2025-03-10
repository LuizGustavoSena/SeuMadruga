import AuthService from "@src/data/use-cases/auth";
import UserService from "@src/data/use-cases/user";
import { NextFunction, Request, Response } from 'express';

export default class AuthController {
    constructor(
        private authService: AuthService,
        private userService: UserService
    ) { };

    async login(req: Request, res: Response, next: NextFunction) {
        try {
            const response = await this.authService.signin(req.body);

            res.status(201).send(response);
        } catch (error: any) {
            next(error);
        }
    }

    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const response = await this.userService.save(req.body);

            res.status(201).send(response);
        } catch (error: any) {
            next(error);
        }
    }
}