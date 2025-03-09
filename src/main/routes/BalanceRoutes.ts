import express from "express";
import MakeBalanceController from "../factories/controllers/makeBalanceController";

const router = express.Router();

const balanceController = MakeBalanceController.getInstance();

router.get('/', balanceController.getBalance);

export default router;
