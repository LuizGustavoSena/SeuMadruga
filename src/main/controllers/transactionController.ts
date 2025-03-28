import AccountService from "@src/data/use-cases/account";
import TransactionService from "@src/data/use-cases/transaction";
import { AccountMessageError } from "@src/domain/validations/account";
import { TransactionMessageError, TransactionValidation } from "@src/domain/validations/transaction";
import { NextFunction, Request, Response } from 'express';

export default class TransactionController {
    constructor(
        private transactionService: TransactionService,
        private accountService: AccountService,
        private validation: TransactionValidation
    ) { };

    async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const response = await this.transactionService.find({
                user_id: req.user.id
            });

            res.status(response.length > 0 ? 200 : 204).send(response);
        } catch (error: any) {
            next(error);
        }
    }

    async create(req: Request, res: Response, next: NextFunction) {
        try {
            this.validation.create(req.body);

            const account = await this.accountService.getByFilter({ user_id: req.user.id });

            if (!account.find(el => el.id === req.body.acc_id)) {
                res.status(403).json({ error: AccountMessageError.ANOTHER_USERS_ACCOUNT });
                return
            }

            const response = await this.transactionService.create(req.body);

            res.status(201).send(response);
        } catch (error: any) {
            next(error);
        }
    }

    async getById(req: Request, res: Response, next: NextFunction) {
        try {
            this.validation.id(Number(req.params.id));

            const response = await this.transactionService.findById(Number(req.params.id));

            res.status(200).send(response);
        } catch (error: any) {
            next(error);
        }
    }

    async updateById(req: Request, res: Response, next: NextFunction) {
        try {
            this.validation.id(Number(req.params.id));

            const response = await this.transactionService.updateById(Number(req.params.id), req.body);

            res.status(200).send(response);
        } catch (error: any) {
            next(error);
        }
    }

    async deleteById(req: Request, res: Response, next: NextFunction) {
        try {
            this.validation.id(Number(req.params.id));

            await this.transactionService.deleteById(Number(req.params.id));

            res.status(200).send();
        } catch (error: any) {
            next(error);
        }
    }

    paramsInterceptor = async (req: Request, res: Response, next: NextFunction) => {
        const transaction = await this.transactionService.findById(Number(req.params.id));

        if (!transaction)
            return res.status(404).send();

        const account = await this.accountService.getByFilter({ user_id: req.user.id });

        if (!account.find(el => el.id === transaction.acc_id))
            return res.status(403).send({ error: TransactionMessageError.ANOTHER_ACCOUNT_TRANSACTION });

        return next();
    }
}