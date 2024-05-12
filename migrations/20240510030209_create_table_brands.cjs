exports.up = function(knex) {
    return knex.schema.createTable('brands', function (table) {
        table.increments('id').primary();
        table.integer('external_id');
        table.string('name').unique();
        table.integer('average_price');
        table.timestamps(true,true);
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('brands');
};
