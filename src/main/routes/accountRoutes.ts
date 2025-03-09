import express from "express";
import MakeAccountController from "../factories/controllers/makeAccountController";

const router = express.Router();

const accountController = MakeAccountController.getInstance();

router.param('id', accountController.paramsInterceptor);

router.route('/')
    .post(accountController.create)
    .get(accountController.getAll);

router.route('/:id')
    .get(accountController.getById)
    .put(accountController.updateById)
    .delete(accountController.deleteById);

export default router;