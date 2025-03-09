import express from "express";
import MakeTransferController from "../factories/controllers/makeTransferController";

const router = express.Router();

const transferController = MakeTransferController.getInstance();

router.param('id', transferController.paramsInterceptor);

router.route('/')
    .post(transferController.create)
    .get(transferController.getAll);

router.route('/:id')
    .get(transferController.getById)
    .put(transferController.updateById)
    .delete(transferController.deleteById);

export default router;