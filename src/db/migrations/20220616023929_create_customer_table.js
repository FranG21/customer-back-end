/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('customer', (table) => {
        table.increments();
        table.text('first_name').notNullable();
        table.text('last_name').notNullable();
        table.date('birthday_date').notNullable();
        table.text('phone_number').notNullable();
        table.boolean('status').defaultTo(true);
        table.timestamps();
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable('customer');
};
