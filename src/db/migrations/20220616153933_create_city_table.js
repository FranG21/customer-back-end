/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('city', (table) => {
        table.increments();
        table.text('name').notNullable();
        table.integer('state_id').notNullable().references('id').inTable('state');
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable('city');
};
