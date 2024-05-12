exports.up = function (knex) {
    return knex.schema.raw(`
    CREATE OR REPLACE FUNCTION update_average_price()
    RETURNS TRIGGER AS $$
    BEGIN
      UPDATE brands
      SET average_price = (
        SELECT AVG(average_price)
        FROM models
        WHERE brand_id = NEW.brand_id
      )
      WHERE id = NEW.brand_id;

      RETURN NEW;
    END;
    $$ LANGUAGE plpgsql;
  `).then(function () {
        return knex.schema.raw(`
      CREATE TRIGGER trigger_update_average_price
      AFTER INSERT ON models
      FOR EACH ROW
      EXECUTE PROCEDURE update_average_price();
    `);
    });
};

exports.down = function (knex) {
    return knex.schema.raw('DROP TRIGGER IF EXISTS trigger_update_average_price ON models;')
        .then(function () {
            return knex.schema.raw('DROP FUNCTION IF EXISTS update_average_price();');
        });
};