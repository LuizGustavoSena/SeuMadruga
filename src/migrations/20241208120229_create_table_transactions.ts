import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('transactions', (t) => {
        t.increments('id').primary();
        t.string('description').notNullable();
        t.enu('type', ['I', 'O']).notNullable();
        t.date('date').notNullable();
        t.decimal('ammount', 15, 2).notNullable();
        t.boolean('status').notNullable().defaultTo(false);
        t.integer('acc_id')
            .references('id')
            .inTable('accounts')
            .notNullable();
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('transactions');
}

