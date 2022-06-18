/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.alterTable('customer', (table) => {
        table.text('dui').notNullable();
        table.text('passport').notNullable();
        table.text('isss').notNullable();
        table.text('afp').notNullable();
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.alterTable('customer', (table) => {
        table.dropColumn('dui');
        table.dropColumn('passpot');
        table.dropColumn('isss');
        table.dropColumn('afp');
    });
};
