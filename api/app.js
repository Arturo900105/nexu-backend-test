import express from 'express'
import brandRoutes from "./routes/brandRoutes.js";
import modelRoutes from "./routes/modelRoutes.js";
import {handleError} from "./middleware/errorHandlerMiddleware.cjs";
import logRequest from "./middleware/loggerMiddleware.js";
export const app = express()

app.use(logRequest);
app.use(express.json());
app.use("/brands", brandRoutes)
app.use("/models", modelRoutes)
app.use(handleError);