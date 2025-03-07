import AccountService from "@src/data/use-cases/account";
import { ValidationError } from "@src/domain/error/validationError";
import { AccountMessageError } from "@src/domain/validations/account";
import { NextFunction, Request, Response } from 'express';

export default class AccountController {
    constructor(
        private accountService: AccountService
    ) { };

    create = async (req: Request, res: Response) => {
        try {
            const response = await this.accountService.create({ ...req.body, user_id: req.user.id });

            res.status(201).send(response);
        } catch (error: any) {
            if (error instanceof ValidationError) {
                res.status(400).send({ error: error.message });
                return;
            }

            res.status(500).send();
        }
    }

    getAll = async (req: Request, res: Response) => {
        try {
            const response = await this.accountService.getByFilter({ user_id: req.user.id });

            res.status(response.length > 0 ? 200 : 204).send(response);
        } catch (error) {
            res.status(500).send();
        }
    }

    getById = async (req: Request, res: Response) => {
        try {
            const response = await this.accountService.getByFilter({ id: Number(req.params.id) });

            res.status(response.length > 0 ? 200 : 404).send(response[0]);
        } catch (error) {
            res.status(500).send();
        }
    }

    updateById = async (req: Request, res: Response) => {
        try {
            const response = await this.accountService.update({
                id: Number(req.params.id),
                name: req.body.name
            });

            res.status(200).send(response);
        } catch (error) {
            if (error instanceof ValidationError) {
                res.status(400).send({ error: error.message });
                return;
            }

            res.status(500).send();
        }
    }

    deleteById = async (req: Request, res: Response) => {
        try {
            await this.accountService.deleteById(Number(req.params.id));

            res.status(200).send();
        } catch (error) {
            res.status(500).send();
        }
    }

    paramsInterceptor = async (req: Request, res: Response, next: NextFunction) => {
        const account = await this.accountService.getByFilter({ id: Number(req.params.id) });

        if (account.length === 0 ||
            (account.length > 0 && account.find(el => el.user_id === req.user.id))
        ) {
            next();
            return;
        }

        res.status(403).json({ error: AccountMessageError.ANOTHER_USERS_ACCOUNT });
    }
}