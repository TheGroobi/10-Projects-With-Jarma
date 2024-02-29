/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.up = function(knex) {
  return knex.schema.createTable('recipes', function (table) {
    table.increments('id');
    table.string('name');
    table.text('description');
    table.string('image_url');
    table.text('disclaimer');
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.down = function(knex) {
  return knex.schema.dropTable('recipes');
};
