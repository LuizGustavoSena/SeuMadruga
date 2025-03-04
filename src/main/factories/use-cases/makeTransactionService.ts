import TransactionService from "@src/data/use-cases/transaction";
import MakeTransactionDatabase from "../database/specif/makeTransactionDatabase";
import MakeTransactionValidation from "../validation/transaction";

export default class MakeTransactionService {
    private static instance: TransactionService;

    constructor() { };

    static getInstance(): TransactionService {
        if (!MakeTransactionService.instance) {
            const transactionDatabase = MakeTransactionDatabase.getInstance();
            const validation = MakeTransactionValidation.getInstance();
            MakeTransactionService.instance = new TransactionService(transactionDatabase, validation);
        }

        return MakeTransactionService.instance;
    }
}