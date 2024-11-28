import { Request, Response } from 'express';
import AuthService from '../services/auth';
import UserService from '../services/user';

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