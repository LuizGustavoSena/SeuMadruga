import BalanceService from "@src/data/use-cases/balance";
import MakeBalanceDatabase from "../database/specif/makeBalanceDatabase";

export default class MakeBalanceService {
    private static instance: BalanceService;

    private constructor() { }

    static getInstance(): BalanceService {
        if (!MakeBalanceService.instance)
            MakeBalanceService.instance = new BalanceService(MakeBalanceDatabase.getInstance());

        return MakeBalanceService.instance;
    }
}