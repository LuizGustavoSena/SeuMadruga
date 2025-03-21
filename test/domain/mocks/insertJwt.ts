import { faker } from "@faker-js/faker/."
import { EncodeProps } from "@src/data/protocols/jwt/jwt"

export const makeJwt = (params?: Partial<EncodeProps>): EncodeProps => {
    return {
        id: params?.id ? params.id : faker.number.int(),
        email: params?.email ? params.email : faker.internet.email(),
        name: params?.name ? params.name : faker.person.firstName()
    }
}