import express from 'express'
import brandRoutes from "./routes/brandRoutes.js";
import modelRoutes from "./routes/modelRoutes.js";
import {handleError} from "./middleware/errorHandlerMiddleware.cjs";
import {logRequest} from "./middleware/loggerMiddleware.cjs";
import cors from "cors";

export const app = express()
let corsOptions = {
    origin: (origin, callback) => {
        console.log(origin);
        if (!process.env.ALLOWED_ORIGINS.includes(origin))
            callback(new Error(`Orígen ${origin} no permitido`), origin);
        callback(null, origin);
    },
    optionsSuccessStatus: 200
};
app.use(logRequest);
app.use(express.json());
app.use(cors(corsOptions));
app.use("/brands", brandRoutes)
app.use("/models", modelRoutes)
app.use(handleError);