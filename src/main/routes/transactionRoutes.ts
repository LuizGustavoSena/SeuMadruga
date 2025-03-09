import express from "express";
import MakeTransactionController from "../factories/controllers/makeTransactionController";

const router = express.Router();

const transactionController = MakeTransactionController.getInstance();

router.param('id', transactionController.paramsInterceptor);

router.route('/')
    .post(transactionController.create)
    .get(transactionController.getAll);

router.route('/:id')
    .get(transactionController.getById)
    .put(transactionController.updateById)
    .delete(transactionController.deleteById);
