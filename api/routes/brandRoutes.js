import express from 'express';
import {brandController} from "../controllers/brandController.js";
import {registerValidationRules} from "../middleware/bodyValidationsMiddleware.cjs";

const router = express.Router();

router.get("/", brandController.getBrands)
router.get("/:id/models", brandController.getModelsByBrandId)
router.post("/", brandController.createBrand)
router.post("/:id/models", registerValidationRules, brandController.createModelForBrand)

export default router;