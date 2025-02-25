import { faker } from "@faker-js/faker/.";
import { getBalanceByUserIdResponse } from "@src/domain/models/balance";

export const responseBalance = (params?: Partial<getBalanceByUserIdResponse>): getBalanceByUserIdResponse => {
    return {
        id: params?.id ? params.id : faker.number.int(),
        sum: params?.sum ? params.sum : String(faker.number.float())
    }
}