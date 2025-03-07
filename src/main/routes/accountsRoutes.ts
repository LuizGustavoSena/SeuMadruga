import express from "express";
import MakeAccountController from "../factories/controllers/accounts";

const router = express.Router();

const accountController = MakeAccountController.getInstance();

router.param('id', accountController.paramsInterceptor);

router.route('/accounts')
    .post(accountController.create)
    .get(accountController.getAll);

router.route('/accounts/:id')
    .get(accountController.getById)
    .put(accountController.updateById)
    .delete(accountController.deleteById);
