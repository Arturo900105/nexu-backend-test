exports.up = function (knex) {
    return knex.schema.raw(`
    CREATE OR REPLACE FUNCTION increment_external_id() 
RETURNS TRIGGER AS $$
DECLARE
    max_external_id integer;
BEGIN
    EXECUTE format('SELECT MAX(external_id) FROM %I',TG_TABLE_NAME)
    INTO max_external_id;
    EXECUTE format('UPDATE %I SET external_id=$2 WHERE id = $1',TG_TABLE_NAME)
    USING NEW.id,max_external_id + 1;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;
  `).then(function () {
        return knex.schema.raw(`
      CREATE TRIGGER increment_external_id_models
      AFTER INSERT ON models
      FOR EACH ROW
      EXECUTE PROCEDURE increment_external_id();
    `);
    }).then(function () {
        return knex.schema.raw(`
      CREATE TRIGGER increment_external_id_brands
      AFTER INSERT ON brands
      FOR EACH ROW
      EXECUTE PROCEDURE increment_external_id();
    `);
    });
};

exports.down = function (knex) {
    return knex.schema.raw('DROP TRIGGER IF EXISTS increment_external_id_models ON models;')
        .then(function () {
            return knex.schema.raw('DROP TRIGGER IF EXISTS increment_external_id_brands ON brands;');
        }).then(function () {
            return knex.schema.raw('DROP FUNCTION IF EXISTS increment_external_id();');
        });
};