import TransactionController from "@src/main/controllers/transactionController";
import MakeAccountService from "../use-cases/makeAccountService";
import MakeTransactionService from "../use-cases/makeTransactionService";
import MakeTransactionValidation from "../validation/transaction";

export default class MakeTransactionController {
    private static instance: TransactionController;

    static getInstance(): TransactionController {
        if (!MakeTransactionController.instance) {
            const transactionService = MakeTransactionService.getInstance();
            const accountService = MakeAccountService.getInstance();
            const validation = MakeTransactionValidation.getInstance();

            MakeTransactionController.instance = new TransactionController(
                transactionService,
                accountService,
                validation
            );
        }

        return MakeTransactionController.instance;
    }
}