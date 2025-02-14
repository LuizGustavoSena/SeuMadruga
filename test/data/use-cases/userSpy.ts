import { faker } from "@faker-js/faker/.";
import { FindByEmailResponse, UserModel, UserProps } from "@src/domain/models/user";
import { User } from "@src/domain/use-cases/user";

export default class UserSpy implements User {
    users: UserProps[] = [];

    constructor() { };

    async findByEmail(email: string): Promise<FindByEmailResponse> {
        const user = this.users.find(el => el.email === email);

        return {
            ...user,
            id: faker.number.int()
        } as FindByEmailResponse;
    }

    async save(params: UserProps): Promise<UserModel> {

        this.users.push(params);

        return {
            email: params.email,
            id: faker.number.int(),
            name: params.name
        }
    }
}