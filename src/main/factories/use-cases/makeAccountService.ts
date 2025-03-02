import AccountService from "@src/data/use-cases/account";
import MakeDatabase from "../database/makeDatabase";
import MakeAccountValidation from "../validation/account";
import MakeTransactionService from "./makeTransactionService";

export default class MakeAccountService {
    private static instance: AccountService;

    private constructor() { }

    static getInstance(): AccountService {
        if (!MakeAccountService.instance) {
            const transactionService = MakeTransactionService.getInstance();
            const database = MakeDatabase.getInstance('accounts');
            const validation = MakeAccountValidation.getInstance();

            MakeAccountService.instance = new AccountService(transactionService, database, validation);
        }

        return MakeAccountService.instance;
    }
}