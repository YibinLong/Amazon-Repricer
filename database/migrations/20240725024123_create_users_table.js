
exports.up = function(knex) {
    return knex.schema.createTable('users', function(table) {
      table.increments('id').primary(); // Auto-incrementing ID column
      table.string('username').notNullable();             // Name column
      table.string('email').notNullable().unique();   // Email column with unique constraint
      table.string('password_hash').notNullable(); // Password
      table.timestamps(true, true);               // Created_at and updated_at columns
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('users');
};
