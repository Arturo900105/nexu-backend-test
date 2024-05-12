import dotenv from 'dotenv';
dotenv.config({
    path: `config/environment/.env.${process.env.NODE_ENV || 'dev'}`
});
import {app} from "./api/app.js";

app.listen(process.env.HOST_PORT, () => console.log(`Server running on http://localhost:${process.env.HOST_PORT}`))