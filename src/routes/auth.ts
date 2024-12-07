import Validation from '@src/domain/validations';
import express, { Express, Request, Response } from 'express';
import { ZodError } from 'zod';
import AuthService from '../services/auth';
import UserService from '../services/user';

const user = new UserService();
const authService = new AuthService(user);

module.exports = (app: Express) => {
    const router = express.Router();

    router.post('/signin', async (req: Request, res: Response) => {
        try {
            const response = await authService.signin(req.body);

            res.status(201).send(response);
        } catch (error: any) {
            res.status(400).send({ error: error.message });
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