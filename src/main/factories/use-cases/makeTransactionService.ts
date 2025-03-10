import TransactionService from "@src/data/use-cases/transaction";
import MakeTransactionDatabase from "../database/specif/makeTransactionDatabase";

export default class MakeTransactionService {
    private static instance: TransactionService;

    constructor() { };

    static getInstance(): TransactionService {
        if (!MakeTransactionService.instance) {
            const transactionDatabase = MakeTransactionDatabase.getInstance();

            MakeTransactionService.instance = new TransactionService(transactionDatabase);
        }

        return MakeTransactionService.instance;
    }
}