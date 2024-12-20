import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("transactions").del();
    await knex("transfers").del();
    await knex("accounts").del();
    await knex("users").del();

    // Inserts seed entries
    await knex("users").insert([
        { id: 10000, name: 'User 1', email: "email1@email.com", password: '$2a$10$/3jKhoSzdr1tuBa1r8iTcOHFpEuC5Z3ZIiX2K4iMSSh.ag2V.w//y' },
        { id: 10001, name: 'User 2', email: "email2@email.com", password: '$2a$10$/3jKhoSzdr1tuBa1r8iTcOHFpEuC5Z3ZIiX2K4iMSSh.ag2V.w//y' }
    ]);

    await knex("accounts").insert([
        { id: 10003, name: 'Account Origin 1', user_id: 10000 },
        { id: 10004, name: 'Account Destin 1', user_id: 10000 },
        { id: 10005, name: 'Account Origin 2', user_id: 10001 },
        { id: 10006, name: 'Account Destin 2', user_id: 10001 },
    ]);

    await knex("transfers").insert([
        {
            id: 10007, description: 'Transfer 1', user_id: 10000,
            acc_ori_id: 10003, acc_dest_id: 10004, ammount: 100, date: new Date()
        },
        {
            id: 10008, description: 'Transfer 2', user_id: 10001,
            acc_ori_id: 10005, acc_dest_id: 10006, ammount: 100, date: new Date()
        },
    ]);

    await knex("transactions").insert([
        {
            description: 'Transfer from acc Origin 1', type: 'I',
            ammount: 100, date: new Date(), acc_id: 10004, transfer_id: 10007
        },
        {
            description: 'Transfer to acc Destin 1', type: 'O',
            ammount: -100, date: new Date(), acc_id: 10003, transfer_id: 10007
        },
        {
            description: 'Transfer from acc Origin 2', type: 'I',
            ammount: 100, date: new Date(), acc_id: 10006, transfer_id: 10008
        },
        {
            description: 'Transfer to acc Destin 2', type: 'O',
            ammount: -100, date: new Date(), acc_id: 10005, transfer_id: 10008
        },
    ]);
};
