const request = require('supertest');
const expect = require('chai').expect;
const chai = require('chai');
const assertArrays = require('chai-arrays');

const { Db } = require('../db/db');
const { Server } = require('../server');

const {
  proc_location_sorting,
  proc_location,
  proc_price_filter
} = require('./data_examples/procedures');

chai.use(assertArrays);

describe('Tests the API', () => {
  before((done) => {
    this.db = new Db()
    this.db.initConnection()
      .then(() => {
        this.app = new Server(this.db, 3001).app;
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

  it('GET /procedures based on location', (done) => {
    request(this.app)
      .get('/procedures?search_query=293&rad=100&lat=34.196159&long=-86.196898')
      .expect(200)
      .then((res) => {
        let body = res.body;
        expect(body).to.be.array();
        expect(body).to.be.eql(proc_location);
        done();
      }).catch((err) => {
        done(err);
      });
  });

  it('GET /procedures based on location with sorting', (done) => {
    request(this.app)
      .get('/procedures?search_query=293&rad=100&lat=34.557662&long=-85.79649&distance_sort=true')
      .expect(200)
      .then((res) => {
        let body = res.body;
        expect(body).to.be.array();
        expect(body).to.be.eql(proc_location_sorting);
        done();
      }).catch((err) => {
        done(err);
      });
  });

  //test that search for procedure works 
  it('GET /procedures with basic word search', (done) => {
    request(this.app)
      .get('/procedures?search_query=SPINAL FUSION')
      .expect(200)
      .then((res) => {
        let body = res.body;
        expect(body).to.be.array();
        done();
      }).catch((err) => {
        done(err);
      });
  });

  it('GET /procedures with a procedure ID', (done) => {
    request(this.app)
      .get('/procedures?search_query=460')
      .expect(200)
      .then((res) => {
        let body = res.body;
        expect(body).to.be.array();
        done();
      }).catch((err) => {
        done(err);
      });
  });

  it('GET /procedures with a basic word search that returns an empty array with a 200 respose', (done) => {
    request(this.app)
      .get('/procedures?search_query=fake procedure')
      .expect(200)
      .then((res) => {
        let body = res.body;
        expect(body).to.be.array().that.is.empty;
        done();
      }).catch((err) => {
        done(err);
      });
  });

  it('GET /procedures with basic price filtering', (done) => {
    request(this.app)
      .get('/procedures?search_query=293&price_min=1000&price_max=4000')
      .expect(200)
      .then((res) => {
        let body = res.body;
        expect(body).to.be.array();
        expect(body).to.be.eql(proc_price_filter);
        done();
      }).catch((err) => {
        //done(err);
      });
  })
});

