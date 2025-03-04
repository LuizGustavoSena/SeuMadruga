import { CreateProps, CreateResponse, FindProps, FindResponse, UpdateProps, UpdateResponse } from "@src/domain/models/transaction";
import { TransactionValidation } from "@src/domain/validations/transaction";
import { TransactionDatabase } from "../protocols/database/specif/transactionDatabase";

export default class TransactionService {
    constructor(
        private readonly db: TransactionDatabase,
        private readonly validation: TransactionValidation
    ) { }

    async find(params: FindProps): Promise<FindResponse[]> {
        const response = await this.db.findTransactions(params);

        return response;
    }

    async findById(id: number): Promise<FindResponse> {
        const response = await this.db.getByFIlter<FindResponse[]>({ id });

        return response[0];
    }

    async create(params: CreateProps): Promise<CreateResponse> {
        this.validation.create(params);

        const dataRequest = params.date ?? new Date();

        const response = await this.db.create<CreateProps, CreateResponse>({ ...params, date: dataRequest });

        return response;
    }

    async updateById(id: number, params: UpdateProps): Promise<UpdateResponse> {
        const response = await this.db.update<UpdateResponse>({
            id,
            data: params
        });

        return response;
    }

    async deleteById(id: number): Promise<void> {
        await this.db.deleteById(id);
    }
};