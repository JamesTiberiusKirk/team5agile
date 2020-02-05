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

  //test that search for procedure works 
  it('does the search procedure return anything', (done)=>{
    request(this.app)
      .get('/procedures?search_query=SPINAL FUSION')
      .expect(200)
      .then((res)=>{
        let body = res.body;
        expect(body).to.be.array();
        done();
      }).catch((err)=>{
        done(err);
      });
  });

  //test that search for procedure works (code)
  it('does the search procedure return anything from code', (done)=>{
    request(this.app)
      .get('/procedures?search_query=460')
      .expect(200)
      .then((res)=>{
        let body = res.body;
        expect(body).to.be.array();
        done();
      }).catch((err)=>{
        done(err);
      });
  });

  //test searching for a procedure that doesn't exist. make sure it still returns 200 but dont expect anything
  it('Does searching for a procedure that doesnt exist still return 200 with no results', (done)=>{
    request(this.app)
      .get('/procedures?search_query=fake procedure')
      .expect(200)
      .then((res)=>{
        let body = res.body;
        expect(body).to.be.array().that.is.empty;
        done();
      }).catch((err)=>{
        done(err);
      });
  });
  
  //MAKE TESTS ON ORDERING AND CONSTRAINTS

  //ovarll test for procedure test
  it('searching for a procedure based on location', (done)=>{
    request(this.app)
      .get('/procedures?search_query=293&rad=10&lat=34.196159&long=-86.196898')
      .expect(200)
      .then((res)=>{
        let body = res.body;
        expect(body).to.be.array();
        done();
      }).catch((err)=>{
        done(err);
      });
  });

});


