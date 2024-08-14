exports.up = function(knex) {
    return knex.schema.createTable('orders', function(table) {
        table.increments('id').primary();
        table.string('order_id').notNullable(); // Amazon order ID
        table.timestamp('purchase_date').notNullable(); // Date when the order was made
        table.string('status').notNullable(); // Order status
    });
};

exports.down = function(knex) {
  return knex.schema.dropTable('orders');
};
