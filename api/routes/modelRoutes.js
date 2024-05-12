import express from 'express';
import {modelController} from "../controllers/modelController.js";
import {registerValidationRules} from "../middleware/bodyValidationsMiddleware.cjs";

const router = express.Router();

router.get("/", modelController.getModels)
router.put("/:id", registerValidationRules, modelController.updateModel)

export default router;