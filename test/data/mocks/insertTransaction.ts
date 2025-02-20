import { faker } from "@faker-js/faker/.";
import { CreateProps, TransactionProps, Type } from "@src/domain/models/transaction";

export const makeTransaction = (params?: Partial<TransactionProps>): CreateProps => {
    return {
        acc_id: params?.acc_id ? params.acc_id : faker.number.int(),
        ammount: params?.ammount ? params.ammount : faker.number.float(),
        description: params?.description ? params.description : faker.string.sample(),
        status: params?.status ? params.status : Math.random() < 0.5,
        type: params?.type ? params.type : Math.random() < 0.5 ? Type.INPUT : Type.OUTPUT,
        date: params?.date ? params.date : faker.date.past(),
        transfer_id: params?.transfer_id ? params.transfer_id : faker.number.int()
    }
}