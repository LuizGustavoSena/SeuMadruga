import TransactionController from "@src/main/controllers/transactionController";
import MakeAccountService from "../use-cases/makeAccountService";
import MakeTransactionService from "../use-cases/makeTransactionService";

export default class MakeTransactionController {
    private static instance: TransactionController;

    static getInstance(): TransactionController {
        if (!MakeTransactionController.instance) {
            const transactionService = MakeTransactionService.getInstance();
            const accountService = MakeAccountService.getInstance();
            MakeTransactionController.instance = new TransactionController(transactionService, accountService);
        }

        return MakeTransactionController.instance;
    }
}