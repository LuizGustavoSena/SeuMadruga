import { faker } from "@faker-js/faker/.";
import { CreateProps, TransactionProps, Type } from "@src/domain/models/transaction";

export const makeTransaction = (params?: Partial<TransactionProps>): CreateProps => {
    const type = Math.random() < 0.5 ? Type.INPUT : Type.OUTPUT;
    const ammount = type === Type.INPUT ? faker.number.float() : faker.number.float() * -1;

    return {
        acc_id: params?.acc_id ? params.acc_id : faker.number.int(),
        ammount: params?.ammount ? params.ammount : ammount,
        description: params?.description ? params.description : faker.string.sample(),
        status: params?.status ? params.status : Math.random() < 0.5,
        type: params?.type ? params.type : type,
        date: params?.date ? params.date : faker.date.past().toISOString(),
        transfer_id: params?.transfer_id ? params.transfer_id : faker.number.int()
    }
}