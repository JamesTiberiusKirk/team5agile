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
    this.db.closeConn().then(()=>{
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
      }).catch((err)=>{
        done(err);
      })
  });

// 33.841338134379676

  it('GET DistanceCalculator', (done) => {
    request(this.app)
      .get('/DisCal?lat1=34.196159&long1=-86.196898&lat2=34.557662&long2=-85.79649')
      .expect(200)
      .then((res) => {
        let body = res.body;
        expect(body).to.be.equal()
      }
  }

});


