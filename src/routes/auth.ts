import AuthService from '@src/services/auth';
import UserService from '@src/services/user';
import { Request, Response } from 'express';

const authService = new AuthService(new UserService());

module.exports = () => {
    const signin = async (req: Request, res: Response) => {
        try {
            const response = await authService.signin(req.body);

            res.status(201).send(response);
        } catch (error: any) {
            res.status(400).send({ error: error.message });
        }
    }

    return { signin };
}