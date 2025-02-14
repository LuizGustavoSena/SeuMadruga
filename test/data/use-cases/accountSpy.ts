import { faker } from "@faker-js/faker/.";
import { CreateProps, CreateResponse, GetAllResponse, GetByIdResponse, UpdateParams, UpdateResponse } from "@src/domain/models/account";
import { Account } from "@src/domain/use-cases/account";

export default class AccountSpy implements Account {
    accounts: CreateResponse[] = [];

    async create(params: CreateProps): Promise<CreateResponse> {
        const account = {
            ...params,
            id: faker.number.int()
        };

        this.accounts.push(account);

        return account;
    }

    async getAll(): Promise<GetAllResponse> {
        return this.accounts;
    }

    async getByFilter(filter: any): Promise<GetByIdResponse[]> {
        const keys = Object.keys(filter);
        var result = this.accounts;

        keys.forEach(key => {
            result = result.filter(el => el[key as keyof CreateResponse] === filter[key])
        });

        return result;
    }

    async update(params: UpdateParams): Promise<UpdateResponse> {
        this.accounts = this.accounts.map(el => {
            if (el.id !== params.id) return el;

            return {
                ...el,
                name: params.name
            }
        });

        return this.accounts.find(el => el.id === params.id) as UpdateResponse;
    }

    async deleteById(id: number): Promise<void> {
        this.accounts = this.accounts.filter(el => el.id != id);
    }
}