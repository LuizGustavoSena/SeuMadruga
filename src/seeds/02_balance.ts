import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    await knex("users").insert([
        { id: 10002, name: 'User 3', email: "email3@email.com", password: '$2a$10$/3jKhoSzdr1tuBa1r8iTcOHFpEuC5Z3ZIiX2K4iMSSh.ag2V.w//y' },
        { id: 10003, name: 'User 4', email: "email4@email.com", password: '$2a$10$/3jKhoSzdr1tuBa1r8iTcOHFpEuC5Z3ZIiX2K4iMSSh.ag2V.w//y' }
    ]);

    await knex("accounts").insert([
        { id: 10007, name: 'Account Main Balance', user_id: 10002 },
        { id: 10008, name: 'Account Secondary Balance', user_id: 10002 },
        { id: 10009, name: 'Account Alternative 1', user_id: 10003 },
        { id: 10010, name: 'Account Alternative 2', user_id: 10003 },
    ]);
};
