import AccountController from "@src/main/controllers/accounts";
import MakeAccountService from "../use-cases/makeAccountService";

export default class MakeAccountController {
    private static instance: AccountController;

    static getInstance(): AccountController {
        if (!MakeAccountController.instance) {
            const service = MakeAccountService.getInstance();
            MakeAccountController.instance = new AccountController(service);
        }

        return MakeAccountController.instance;
    }
}