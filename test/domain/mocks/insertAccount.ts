import { faker } from "@faker-js/faker/."
import { CreateProps } from "@src/domain/models/account"

export const makeAccount = (params?: Partial<CreateProps>): CreateProps => {
    return {
        name: params?.name ? params?.name : faker.person.fullName(),
        user_id: params?.user_id ? params?.user_id : faker.number.int()
    }
}