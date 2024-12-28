import { Knex } from "knex";
import moment from "moment";

export async function seed(knex: Knex): Promise<void> {
    await knex("users").insert([
        { id: 10002, name: 'User 3', email: "email3@email.com", password: '$2a$10$/3jKhoSzdr1tuBa1r8iTcOHFpEuC5Z3ZIiX2K4iMSSh.ag2V.w//y' },
        { id: 10003, name: 'User 4', email: "email4@email.com", password: '$2a$10$/3jKhoSzdr1tuBa1r8iTcOHFpEuC5Z3ZIiX2K4iMSSh.ag2V.w//y' },
        { id: 10004, name: 'User 5', email: "email5@email.com", password: '$2a$10$/3jKhoSzdr1tuBa1r8iTcOHFpEuC5Z3ZIiX2K4iMSSh.ag2V.w//y' }
    ]);

    await knex("accounts").insert([
        { id: 10007, name: 'Account Main Balance', user_id: 10002 },
        { id: 10008, name: 'Account Secondary Balance', user_id: 10002 },
        { id: 10009, name: 'Account Alternative 1', user_id: 10003 },
        { id: 10010, name: 'Account Alternative 2', user_id: 10003 },
        { id: 10011, name: 'Account General Balance', user_id: 10004 },
        { id: 10012, name: 'Account General Secondary Balance', user_id: 10004 },
    ]);

    await knex("transfers").insert([
        {
            id: 10009, description: 'Transfer 3', user_id: 10004,
            acc_ori_id: 10012, acc_dest_id: 10011, ammount: 256, date: new Date()
        },
        {
            id: 10010, description: 'Transfer 4', user_id: 10003,
            acc_ori_id: 10009, acc_dest_id: 10010, ammount: 512, date: new Date()
        },
    ]);

    await knex("transactions").insert([
        {
            description: '2', type: 'I', ammount: 2,
            date: new Date(), acc_id: 10011, status: true
        },
        {
            description: '2', type: 'I', ammount: 4,
            date: new Date(), acc_id: 10009, status: true
        },
        {
            description: '2', type: 'I', ammount: 8,
            date: new Date(), acc_id: 10012, status: true
        },
        {
            description: '2', type: 'I', ammount: 16,
            date: new Date(), acc_id: 10011, status: false
        },
        {
            description: '2', type: 'I', ammount: 32,
            date: moment().subtract({ days: 5 }).toDate(), acc_id: 10011, status: true
        },
        {
            description: '2', type: 'I', ammount: 64,
            date: moment().add({ days: 5 }).toDate(), acc_id: 10011, status: true
        },
        {
            description: '2', type: 'O', ammount: -128,
            date: moment().toDate(), acc_id: 10011, status: true
        },
        {
            description: '2', type: 'I', ammount: 256,
            date: moment().toDate(), acc_id: 10011, status: true
        },
        {
            description: '2', type: 'O', ammount: -256,
            date: moment().toDate(), acc_id: 10012, status: true
        },
        {
            description: '2', type: 'I', ammount: 512,
            date: moment().toDate(), acc_id: 10010, status: true
        },
        {
            description: '2', type: 'O', ammount: -512,
            date: moment().toDate(), acc_id: 10009, status: true
        },
    ]);
};
