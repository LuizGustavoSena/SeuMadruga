import MakeAuthService from '@src/main/factories/use-cases/makeAuthService';
import MakeUserService from '@src/main/factories/use-cases/makeUserService';
import express, { Request, Response } from 'express';
import { ZodError } from 'zod';
import Validation from '../domain/validations';

const user = MakeUserService.getInstance();
const authService = MakeAuthService.getInstance();

module.exports = () => {
    const router = express.Router();

    router.post('/signin', async (req: Request, res: Response) => {
        try {
            Validation.loginUser(req.body);

            const response = await authService.signin(req.body);

            res.status(201).send(response);
        } catch (error: any) {
            let message = error instanceof ZodError ? `${error.errors.map(el => el.message).join(', ')}` : error.message;

            res.status(400).send({ error: message });
        }
    });

    router.post('/signup', async (req: Request, res: Response) => {
        try {
            Validation.createUser(req.body);

            const response = await user.save(req.body);

            res.status(201).json(response);
        } catch (error: any) {
            let message = error instanceof ZodError ? `${error.errors.map(el => el.message).join(', ')}` : error.message;

            res.status(400).json({ error: message });
        }
    });

    return router;
}