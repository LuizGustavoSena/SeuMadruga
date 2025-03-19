import { faker } from "@faker-js/faker/."
import { UserProps } from "@src/domain/models/user"

export const makeUser = (params?: Partial<UserProps>): UserProps => {
    return {
        email: params?.email ? params?.email : faker.internet.email(),
        name: params?.name ? params?.name : faker.person.fullName(),
        password: params?.password ? params?.password : faker.internet.password()
    }
}