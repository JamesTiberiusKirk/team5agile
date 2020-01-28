const request = require('supertest');
const app = require('../main');

describe('GET /', () => {
  it('Okays the user', (done) => {
    request(app)
      .get('/')
      .expect(200)
      .expect('ok', done)
  });
});

describe('GET /providers', () => {
  it('Returns a list of providers', (done) => {
    request(app)
      .get('/providers')
      .expect(200, done)
  });
});

describe('POST /provider/add', () => {
  it('Sends example porvider', (done) => {
    request(app)
      .post('/provider/add')
      .send({
        provider_ID: '001',
        provider_Name: 'test',
        provider_StreetAdd: 'test street',
        provider_City: 'test city',
        provider_State: 'test state',
        provider_Zip: 'test ZIP',
        provider_referral: 'test referral'
      })
      .expect(201)
      .expect('added', done)
  });
});


