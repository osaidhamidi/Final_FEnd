const request = require('supertest');
const app = require('../src/server/server'); 

describe('server test', () => {

  it('successful get', async function () {
    const response = await request(app).get('/');
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('message', 'response');
  });

  it('bad request', async function () {
    const response = await request(app)
      .post('/all-apis')
      .send({});
    expect(response.statusCode).toBe(404);
    expect(response.body).toHaveProperty('error');
  });


});