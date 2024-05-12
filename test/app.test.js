// import request from 'supertest';
// import {app} from "../api/app.js";
import {db} from "../config/database/postgresql.js";

describe('Check DB Connection', () => {
    afterAll(async () => {
        await db.destroy()
    })
    it('should connect to the database successfully', async () => {
           await expect(db.raw('select 1+1 as result')).resolves.toHaveProperty('rows')
    });
});