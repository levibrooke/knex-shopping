
exports.up = function(knex, Promise) {
  return knex.schema.alterTable('users', (table) => {
    table.timestamp('created_at').notNullable().defaultTo(knex.fn.now()).alter();
    table.timestamp('updated_at').notNullable().defaultTo(knex.fn.now()).alter();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.alterTable('users', (table) => {
    table.timestamp('created_at').nullable().alter();
    table.timestamp('created_at').nullable().alter();
  });
};
