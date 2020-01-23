const request = require('supertest');
const app = require('../app');

describe('GET /', () => {
  it('Okays the user', (done) => {
    request(app).get('/')
      .expect(200)
      .expect('ok', done)
  });
});

