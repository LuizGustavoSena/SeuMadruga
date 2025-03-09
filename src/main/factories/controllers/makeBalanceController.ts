import BalanceController from "@src/main/controllers/balanceController";
import MakeBalanceService from "../use-cases/makeBalanceService";

export default class MakeBalanceController {
    static instance: BalanceController;

    static getInstance() {
        if (!MakeBalanceController.instance) {
            const service = MakeBalanceService.getInstance();

            MakeBalanceController.instance = new BalanceController(service);
        }

        return MakeBalanceController.instance;
    }
}