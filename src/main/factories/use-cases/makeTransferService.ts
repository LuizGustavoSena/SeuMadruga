import TransferService from "@src/data/use-cases/transfer";
import MakeTransferDatabase from "../database/specif/makeTransferDatabase";

export default class MakeTransferService {
    private static instance: TransferService;

    private constructor() { }

    static getInstance(): TransferService {
        if (!MakeTransferService.instance)
            MakeTransferService.instance = new TransferService(MakeTransferDatabase.getInstance());

        return MakeTransferService.instance;
    }
}