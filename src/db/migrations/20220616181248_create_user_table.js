/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('user', (table) => {
        table.increments();
        table.text('email').unique().notNullable();
        table.text('password').notNullable();
        table.integer('type').notNullable();
        table.boolean('status').defaultTo(true);
        table.integer('customer_id').references('id').inTable('customer');
        table.timestamps();
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable('user');
};
