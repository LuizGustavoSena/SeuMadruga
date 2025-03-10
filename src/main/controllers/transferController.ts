import AccountService from "@src/data/use-cases/account";
import TransferService from "@src/data/use-cases/transfer";
import { TransferValidation } from "@src/domain/validations/transfer";
import { NextFunction, Request, Response } from 'express';

export default class TransferController {
    constructor(
        private transferService: TransferService,
        private accountService: AccountService,
        private validation: TransferValidation
    ) { };

    async paramsInterceptor(req: Request, res: Response, next: NextFunction) {
        const transfer = await this.transferService.find({ id: Number(req.params.id) });

        if (transfer.length === 0)
            return res.status(404).send();

        if (transfer[0].user_id !== req.user.id)
            return res.status(403).send({ error: 'Essa transação não pertence a essa conta' });

        return next();
    };

    async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const response = await this.transferService.find({ user_id: req.user.id });

            res.status(response.length > 0 ? 200 : 204).send(response);
        } catch (error: any) {
            next(error);
        }
    }

    async create(req: Request, res: Response, next: NextFunction) {
        try {
            this.validation.create(req.body);

            const accountOrigin = await this.accountService.getByFilter({ id: req.body.acc_ori_id });

            if (accountOrigin.length === 0 || accountOrigin[0].user_id !== req.user.id)
                throw new Error('acc_ori_id não pertence a esse usuário');

            const accountDestiny = await this.accountService.getByFilter({ id: req.body.acc_dest_id });

            if (accountDestiny.length === 0 || accountDestiny[0].user_id !== req.user.id)
                throw new Error('acc_dest_id não pertence a esse usuário');

            const response = await this.transferService.create({ ...req.body, user_id: req.user.id });

            res.status(201).send(response);
        } catch (error: any) {
            next(error);
        }
    }

    async getById(req: Request, res: Response, next: NextFunction) {
        try {
            const response = await this.transferService.find({ id: Number(req.params.id) });

            res.status(200).send(response[0]);
        } catch (error: any) {
            next(error);
        }
    }

    async updateById(req: Request, res: Response, next: NextFunction) {
        try {
            const response = await this.transferService.update({
                id: Number(req.params.id),
                data: req.body
            });

            res.status(200).send(response);
        } catch (error: any) {
            next(error);
        }
    }

    async deleteById(req: Request, res: Response, next: NextFunction) {
        try {
            await this.transferService.deleteById(Number(req.params.id));

            res.status(200).send();
        } catch (error: any) {
            next(error);
        }
    }
}