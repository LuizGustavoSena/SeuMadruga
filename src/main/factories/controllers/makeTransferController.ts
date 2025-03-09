import TransferController from "@src/main/controllers/transferController";
import MakeAccountService from "../use-cases/makeAccountService";
import MakeTransferService from "../use-cases/makeTransferService";

export default class MakeTransferController {
    private static instance: TransferController;

    static getInstance(): TransferController {
        if (!MakeTransferController.instance) {
            const transferService = MakeTransferService.getInstance();
            const accountService = MakeAccountService.getInstance();
            MakeTransferController.instance = new TransferController(transferService, accountService);
        }

        return MakeTransferController.instance;
    }
}