const fs = require('fs');
const path = require('path');
const dataPath = path.join(process.cwd(), 'models.json');
const jsonData = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

exports.up = async function (knex) {
    let dataFiltered = jsonData.map((item) => {
        return {
            external_id: item.id,
            name: item.name,
            average_price: item.average_price,
            brand_name: item.brand_name,
            brand_id: knex('brands').where({
                name: item.brand_name
            }).select('id')
        }
    })
    await knex('models').insert(dataFiltered);
};

exports.down = async function (knex) {
    await knex('models').del();
};
