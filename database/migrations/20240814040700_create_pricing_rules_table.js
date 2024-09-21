exports.up = function(knex) {
  return knex.schema.createTable('pricing_rules', function(table) {
    table.increments('id').primary();
    table.integer('product_id').unsigned().notNullable(); // Foreign key to products
    table.decimal('min_price', 10, 2); // Minimum price
    table.decimal('max_price', 10, 2); // Maximum price
    table.decimal('target_price', 10, 2); // Target price
    table.foreign('product_id').references('products.id'); // Foreign key constraint
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('pricing_rules');
};
