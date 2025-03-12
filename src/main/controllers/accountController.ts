import AccountService from "@src/data/use-cases/account";
import { AccountMessageError, AccountValidation } from "@src/domain/validations/account";
import { NextFunction, Request, Response } from 'express';

export default class AccountController {
    constructor(
        private accountService: AccountService,
        private validation: AccountValidation
    ) { };

    create = async (req: Request, res: Response, next: NextFunction) => {
        try {
            this.validation.create(req.body);

            const response = await this.accountService.create({ ...req.body, user_id: req.user.id });

            res.status(201).send(response);
        } catch (error: any) {
            next(error);
        }
    }

    getAll = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const response = await this.accountService.getByFilter({ user_id: req.user.id });

            res.status(response.length > 0 ? 200 : 204).send(response);
        } catch (error) {
            next(error);
        }
    }

    getById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            this.validation.id(Number(req.params.id));

            const response = await this.accountService.getByFilter({ id: Number(req.params.id) });

            res.status(response.length > 0 ? 200 : 404).send(response[0]);
        } catch (error) {
            next(error);
        }
    }

    updateById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            this.validation.id(Number(req.params.id));
            this.validation.update(req.body);

            const response = await this.accountService.update({
                id: Number(req.params.id),
                name: req.body.name
            });

            res.status(200).send(response);
        } catch (error) {
            next(error);
        }
    }

    deleteById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            this.validation.id(Number(req.params.id));

            await this.accountService.deleteById(Number(req.params.id));

            res.status(200).send();
        } catch (error) {
            next(error);
        }
    }

    paramsInterceptor = async (req: Request, res: Response, next: NextFunction) => {
        const account = await this.accountService.getByFilter({ id: Number(req.params.id) });

        if (account.length === 0 || account.find(el => el.user_id === req.user.id))
            return next();

        return res.status(403).json({ error: AccountMessageError.ANOTHER_USERS_ACCOUNT });
    }
}