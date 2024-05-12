exports.up = function(knex) {
    return knex.schema.createTable('models', function (table) {
        table.increments('id').primary();
        table.integer('external_id');
        table.string('name');
        table.integer('average_price');
        table.string('brand_name');
        table.integer('brand_id').unsigned().notNullable();
        table.timestamps(true,true);

        table.foreign('brand_id').references('id').inTable('brands');
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('models');
};
