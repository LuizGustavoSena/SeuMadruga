import { CreateProps, CreateResponse, FindProps, FindResponse, UpdateProps, UpdateResponse } from "@src/domain/models/transaction";
import { TransactionDatabase } from "@src/infrastructure/models/transactionDatabase";

export default class TransactionService {
    constructor(
        private readonly db: TransactionDatabase
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