import request from 'supertest';
import {app} from '../api/app.js';
import {db} from '../config/database/postgresql.js';

describe('Check DB Connection and Services', () => {
  afterAll(async () => {
    await db.destroy();
  });

  it('should connect to the database successfully', async () => {
    await expect(db.raw('select 1+1 as result')).
        resolves.
        toHaveProperty('rows');
  });

  it('should get a JsonArray with all the brands', async () => {
    const response = await request(app).
        get('/brands').
        set('Accept', 'application/json');
    expect(response.status).toEqual(200);
    expect(response.body.length).toBeGreaterThan(0);
  });

  it('should get a JsonArray with all the models', async () => {
    const response = await request(app).
        get('/models').
        set('Accept', 'application/json');
    expect(response.status).toEqual(200);
    expect(response.body.length).toBeGreaterThan(0);
  });

  it('should get a JsonArray with all the models for a brand', async () => {
    const response = await request(app).
        get('/brands/1/models').
        set('Accept', 'application/json');
    expect(response.status).toEqual(200);
    expect(response.body.length).toBeGreaterThan(0);
  });

  it('should create a new brand', async () => {
      const response = await request(app).
          post('/brands').send({
            "name": "Toyota-" + Math.random()
          });
      expect(response.status).toEqual(200);
      expect(response.body.length).toBeGreaterThan(0);

  });
});
