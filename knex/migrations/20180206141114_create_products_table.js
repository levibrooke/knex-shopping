
exports.up = function(knex, Promise) {
  return knex.schema.createTable('products', (table) => {
    table.increments('id');
    table.string('title');
    table.text('description');
    table.integer('inventory');
    table.decimal('price');
    table.timestamp('created_at');
    table.timestamp('updated_at');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('products');
};
