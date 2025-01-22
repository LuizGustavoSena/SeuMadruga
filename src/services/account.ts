import { CreateProps, CreateResponse, GetAllResponse, GetByIdResponse, UpdateParams, UpdateResponse } from "@src/domain/models/account";
import { Database } from "@src/infrastructure/models/database";
import TransactionService from "./transaction";

export default class AccountService {
    constructor(
        private transactionService: TransactionService,
        private db: Database,
    ) { };

    async create(params: CreateProps): Promise<CreateResponse> {
        const account = await this.getByFilter({ name: params.name, user_id: params.user_id });

        if (account.length > 0)
            throw new Error('Conta existente');

        const response = await this.db.create<CreateProps, CreateResponse>(params);

        return response;
    }

    async getAll(): Promise<GetAllResponse> {
        const response = await this.db.getAll<GetAllResponse>();

        return response;
    }

    async getByFilter(filter: any): Promise<GetByIdResponse[]> {
        const response = await this.db.getByFIlter<GetByIdResponse[]>(filter);

        return response;
    }

    async update(params: UpdateParams): Promise<UpdateResponse> {
        const response = await this.db.update<UpdateResponse>({
            id: params.id,
            data: {
                name: params.name
            }
        });

        return response;
    }

    async deleteById(id: number): Promise<void> {
        const account = await this.getByFilter({ id });

        const transaction = await this.transactionService.find({ user_id: account[0].user_id });

        if (transaction.length > 0) throw new Error('Não é possível excluir conta por ter transações vinculadas a ela');

        await this.db.deleteById(id);
    }
}