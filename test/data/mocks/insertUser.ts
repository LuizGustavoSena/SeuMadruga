import { faker } from "@faker-js/faker/."
import { UserProps } from "@src/domain/models/user"

export const makeUser = (): UserProps  => {
    return {
        email: faker.internet.email(),
        name: faker.person.fullName(),
        password: faker.internet.password()
    }
}