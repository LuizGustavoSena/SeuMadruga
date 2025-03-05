import TransferService from "@src/data/use-cases/transfer";
import MakeTransferDatabase from "../database/specif/makeTransferDatabase";
import MakeTransferValidation from "../validation/trasfer";

export default class MakeTransferService {
    private static instance: TransferService;

    private constructor() { }

    static getInstance(): TransferService {
        if (!MakeTransferService.instance) {
            const transferDatabase = MakeTransferDatabase.getInstance();
            const validation = MakeTransferValidation.getInstance();

            MakeTransferService.instance = new TransferService(transferDatabase, validation);
        }

        return MakeTransferService.instance;
    }
}