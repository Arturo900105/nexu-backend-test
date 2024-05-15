import express from 'express'
import brandRoutes from "./routes/brandRoutes.js";
import modelRoutes from "./routes/modelRoutes.js";
import {handleError} from "./middleware/errorHandlerMiddleware.cjs";
import {logRequest} from "./middleware/loggerMiddleware.cjs";
import cors from "cors";
export const app = express()
const corsOptions = {
    origin: '*',
    methods: 'GET,PUT,POST',
    allowedHeaders: ['Content-Type', 'application/json'],
    credentials: false,
    optionsSuccessStatus: 204
};
app.use(logRequest);
app.use(express.json());
app.use(cors(corsOptions));
app.use("/brands", brandRoutes)
app.use("/models", modelRoutes)
app.use(handleError);