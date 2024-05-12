import {db} from '../../config/database/postgresql.js';
import Model from "../entities/model.js";

class ModalRepository {
    async findAll(filters) {
        const {lower, greater} = filters
        const rows = await db.column('*').select().from('models').where(
            function () {
                if (lower) this.where('average_price', '<=', lower)
                if (greater) this.where('average_price', '>=', greater)
            }).orderBy('id', 'asc')
        return rows.map(row => new Model(row))
    }

    async updateById(id, model) {
        const {average_price} = model
        const rows = await db('models').returning(['*']).where('id', id).update({average_price});
        return rows.map(row => new Model(row))
    }
}

export default new ModalRepository()