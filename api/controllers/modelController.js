import ModelRepository from "../repositories/modelRepository.js";

class ModelController {
    constructor() {
    }

    async getModels(req, res, next) {
        try {
            const modals = await ModelRepository.findAll(req.query)
            return res.send(modals)
        } catch (err) {
            next(err);
        }
    }

    async updateModel(req, res, next) {
        try {
            const modals = await ModelRepository.updateById(req.params.id, req.body)
            return res.send(modals)
        } catch (err) {
            next(err);
        }
    }
}

export const modelController = new ModelController();