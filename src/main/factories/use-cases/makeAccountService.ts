import AccountService from "@src/data/use-cases/account";
import MakeDatabase from "../database/makeDatabase";
import MakeTransactionService from "./makeTransactionService";

export default class MakeAccountService {
    private static instance: AccountService;

    private constructor() { }

    static getInstance(): AccountService {
        if (!MakeAccountService.instance)
            MakeAccountService.instance = new AccountService(MakeTransactionService.getInstance(), MakeDatabase.getInstance('accounts'));

        return MakeAccountService.instance;
    }
}