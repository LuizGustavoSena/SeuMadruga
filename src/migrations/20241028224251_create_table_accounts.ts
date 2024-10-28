import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('accounts', t => {
        t.increments('id').primary(),
            t.string('name').notNullable(),
            t.integer('user_id')
                .references('id')
                .inTable('users')
                .notNullable()
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('accounts');
}

