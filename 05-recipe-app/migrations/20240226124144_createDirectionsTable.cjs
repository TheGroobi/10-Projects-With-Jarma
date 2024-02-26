/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('directions', function(table) {
        table.increments('id');
        table.text('description');
        table.integer('recipe_id').unsigned().references('id').inTable('recipes').onDelete('CASCADE');
        table.integer('order');
      })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('directions');
};
