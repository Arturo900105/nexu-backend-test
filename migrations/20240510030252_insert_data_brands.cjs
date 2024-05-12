const fs = require('fs');
const path = require('path');
const dataPath = path.join(process.cwd(), 'models.json');
const jsonData = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
let dataFiltered = []
jsonData.map((item)=>{
    let exist= dataFiltered.filter((brand)=>{return brand.name === item.brand_name})
    if(exist.length > 0){
        exist.average_price += item.average_price
    } else {
        dataFiltered.push({
            external_id: item.id,
            name:  item.brand_name,
            average_price: item.average_price
        })
    }
})

exports.up = async function (knex) {
    await knex('brands').insert(dataFiltered);
};

exports.down = async function (knex) {
    await knex('brands').del();
};
