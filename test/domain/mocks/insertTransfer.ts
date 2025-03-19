import { faker } from "@faker-js/faker/.";
import { CreateTransfer, insertTransactionsProps } from "@src/domain/models/transfer";

export const makeTransfer = (params?: Partial<CreateTransfer>): CreateTransfer => {
    return {
        acc_dest_id: params?.acc_dest_id ? params.acc_dest_id : faker.number.int(),
        acc_ori_id: params?.acc_ori_id ? params.acc_ori_id : faker.number.int(),
        ammount: params?.ammount ? params.ammount : faker.number.float(),
        date: params?.date ? params.date : faker.date.future().toISOString(),
        description: params?.description ? params.description : faker.string.alphanumeric(),
        user_id: params?.user_id ? params.user_id : faker.number.int()
    }
}

export const makeInsertTransactions = (params?: Partial<insertTransactionsProps>): insertTransactionsProps => {
    return {
        acc_dest_id: params?.acc_dest_id ? params.acc_dest_id : faker.number.int(),
        acc_ori_id: params?.acc_ori_id ? params.acc_ori_id : faker.number.int(),
        ammount: params?.ammount ? params.ammount : faker.number.float(),
        date: params?.date ? params.date : faker.date.future().toISOString(),
        id: params?.id ? params.id : faker.number.int(),
    }
}