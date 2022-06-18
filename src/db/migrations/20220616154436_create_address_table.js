/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('address', (table) => {
        table.increments();
        table.text('description').notNullable();
        table.boolean('status').defaultTo(true);
        table.integer('customer_id').notNullable().references('id').inTable('customer');
        table.integer('city_id').notNullable().references('id').inTable('city');
        table.timestamps();
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable('address');
};
