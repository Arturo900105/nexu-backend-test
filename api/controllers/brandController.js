import BrandRepository from "../repositories/brandRepository.js";

class BrandController {
    constructor() {
    }

    async getBrands(req, res, next) {
        try {
            const brands = await BrandRepository.findAll()
            return res.send(brands)
        } catch (err) {
            next(err);
        }
    }

    async getModelsByBrandId(req, res, next) {
        try {
            const models = await BrandRepository.findModelsByBrandId(req.params.id)
            return res.send(models)
        } catch (err) {
            next(err);
        }
    }

    async createBrand(req, res, next) {
        try {
            const model = await BrandRepository.createBrand(req.body.name)
            return res.send(model)
        } catch (err) {
            next(err);
        }
    }

    async createModelForBrand(req, res, next) {
        try {
            const model = await BrandRepository.createModelForBrand(req.body.name, req.body.average_price,req.params.id)
            return res.send(model)
        } catch (err) {
            console.log(err)
            next(err);
        }
    }
}

export const brandController = new BrandController();