import TransactionService from "@src/data/use-cases/transaction";
import MakeTransactionDatabase from "../database/specif/makeTransactionDatabase";

export default class MakeTransactionService {
    private static instance: TransactionService;

    constructor() { };

    static getInstance(): TransactionService {
        if (!MakeTransactionService.instance)
            MakeTransactionService.instance = new TransactionService(MakeTransactionDatabase.getInstance());

        return MakeTransactionService.instance;
    }
}