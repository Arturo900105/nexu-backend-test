import {db} from '../../config/database/postgresql.js';
import Brand from '../entities/brand.js';
import Model from "../entities/model.js";

class BrandRepository {
    async findAll() {
        const rows = await db.column('*').select().from('brands').orderBy('id', 'asc')
        return rows.map(row => new Brand(row))
    }

    async findModelsByBrandId(id) {
        const rows = await db.column('*').select().from('models').where('brand_id', id).orderBy('external_id', 'asc')
        return rows.map(row => new Model(row))
    }

    async createBrand(brandName) {
        const exist = await db.column('*').select().from('brands').where({'name': brandName}).first()
        if (exist) {
            throw Error(`Cannot create brand for brand: ${brandName}`)
        }
        const rows = await db('brands').returning(['id', 'name']).insert({name: brandName})
        return rows.map(row => new Model(row))
    }

    async createModelForBrand(modelName, averagePrice, brandId) {
        const exist = await db.column('*').select().from('models').where({'name': modelName, brand_id: brandId}).first()
        if (exist) {
            throw Error(`Cannot create model for brand: ${modelName}`)
        }
        const brandName = await db.column('name').select().from('brands').where({'id': brandId}).first()
        const rows = await db('models').returning(['external_id', 'name']).insert({
            name: modelName,
            brand_id: brandId,
            brand_name: brandName.name,
            average_price: averagePrice
        })
        return rows.map(row => new Model(row))
    }
}

export default new BrandRepository()