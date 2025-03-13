import type { Knex } from "knex";


export async function up(knex: Knex): Promise<any> {
    return Promise.all([
        knex.schema.createTable('transfers', (t) => {
            t.increments('id').primary();
            t.string('description').notNullable();
            t.date('date').notNullable();
            t.decimal('ammount', 15, 2).notNullable();
            t.integer('acc_ori_id')
                .references("id")
                .inTable('accounts')
                .notNullable();
            t.integer('acc_dest_id')
                .references('id')
                .inTable('accounts')
                .notNullable();
            t.integer('user_id')
                .references('id')
                .inTable('users')
                .notNullable();
        }),
        knex.schema.table('transactions', (t) => {
            t.integer('transfer_id')
                .references('id')
                .inTable('transfers');
        })
    ])
}


export async function down(knex: Knex): Promise<any> {
    return Promise.all([
        knex.schema.table('transactions', t => {
            t.dropColumn('transfer_id')
        }),
        knex.schema.dropTable('transfers')
    ]);
}