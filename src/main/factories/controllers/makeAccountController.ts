import AccountController from "@src/main/controllers/accountController";
import MakeAccountService from "../use-cases/makeAccountService";
import MakeAccountValidation from "../validation/account";

export default class MakeAccountController {
    private static instance: AccountController;

    static getInstance(): AccountController {
        if (!MakeAccountController.instance) {
            const service = MakeAccountService.getInstance();
            const validation = MakeAccountValidation.getInstance();

            MakeAccountController.instance = new AccountController(service, validation);
        }

        return MakeAccountController.instance;
    }
}