
exports.up = function(knex, Promise) {
  return knex.schema.createTable('cart', (table) => {
    table.increments('id');
    table.integer('user_id');
    table.foreign('user_id').references('users.id');
    table.integer('products_id');
    table.foreign('products_id').references('products.id');
    table.timestamp('created_at');
    table.timestamp('updated_at');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('cart');
};
