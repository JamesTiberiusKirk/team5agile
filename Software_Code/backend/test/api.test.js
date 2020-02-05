const request = require('supertest');
const expect = require('chai').expect;
const chai = require('chai');
const assertArrays = require('chai-arrays');

const { Db } = require('../db/db');
const { Server } = require('../server');

chai.use(assertArrays);

describe('Tests the API', () => {
  before((done) => {
    this.db = new Db()
    this.db.initConnection()
      .then(() => {
        this.app = new Server(this.db).app;
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  after((done) => {
    this.db.closeConn().then(() => {
      done()
    });
  });

  it('GET /providers', (done) => {
    request(this.app)
      .get('/providers?search_query=texas')
      .expect(200)
      .then((res) => {
        let body = res.body;
        expect(body).to.be.array();
        done();
      }).catch((err) => {
        done(err);
      })
  });

  it('GET /procedures based on price filtering', (done) => {
    request(this.app)
      .get(`/procedures?search_query=293&price_min=1000&price_max=4000`)
      .expect(200)
      .then((res) => {
        let body = res.body;
        expect(body).to.be.array();
        done();
      }).catch((err) => {
        done(err);
      });
  });

  // 33.841338134379676
  it('GET /procedures based on location', (done) => {
    request(this.app)
      .get('/procedures?search_query=293&rad=10&lat=34.196159&long=-86.196898')
      .expect(200)
      .then((res) => {
        let body = res.body;
        expect(body).to.be.array();
        done();
      }).catch((err) => {
        done(err);
      });
  });

});


