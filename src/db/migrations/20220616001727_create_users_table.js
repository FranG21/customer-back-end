/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('example', (table) => {
        table.increments();
        table.text('email').unique().notNullable();
        table.text('password').notNullable();
        table.boolean('status').defaultTo(true);
        table.specificType('tokens', 'text ARRAY');
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable('example');
};
