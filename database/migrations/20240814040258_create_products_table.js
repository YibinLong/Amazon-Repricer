exports.up = function(knex) {
  return knex.schema.createTable('products', function(table) {
    table.increments('id').primary();
    table.string('asin').unique().notNullable(); // Amazon ASIN
    table.string('title'); // Product name
    table.decimal('price', 10, 2); // Current price
    table.string('status'); // Product status
    table.integer('user_id').unsigned().notNullable(); // User ID 
    table.foreign('user_id').references('users.id'); // Foreign key constraint
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('products');
};
