const chai = require('chai');
const {expect} = require('chai');
const assertArrays = require('chai-arrays');
const chaiQuantifiers = require('chai-quantifiers');

chai.use(chaiQuantifiers);
chai.use(assertArrays);
chai.use(require("chai-sorted"));
chai.use(require('chai-http'));
  describe('GET /api/posts', () => {
    it('should be sorted properly', (done) => {
      chai.request(server)
      .get('/api/ping/')
      .query({"tags":["history","football"],"sortBy":"id","direction":"desc"})
      .end((err, res) => {
        expect(res.body).to.be.sorted((prev, next) => { 
            prev.id < next.id
             } ) 
        should.not.exist(err);
        done();
      });
      chai.request(server)
      .get('/api/ping/')
      .query({"tags":["history","football"],"sortBy":"id","direction":"asc"})
      .end((err, res) => {
        expect(res.body).to.be.sorted((prev, next) => { 
            prev.id > next.id
             } ) 

        should.not.exist(err);
        // there should be a 200 status code
        res.status.should.equal(200);
        // the response should be JSON
        res.type.should.equal('application/json');
        done();
      });
    });
  });
describe('GET /api/posts', () => {
    it('should be sorted properly', (done) => {
      chai.request(server)
      .get('/api/ping/')
      .query({"tags":["history","football"],"sortBy":"id","direction":"desc"})
      .end((err, res) => {
        uniquearr = [...new Set(res.body)]
        expect(res.body.length).to.be.equal.to(uniquearr.length)
        should.not.exist(err);
        done();
      });
    });
  });
    describe('GET /api/ping', () => {
    it('should respond with success message', (done) => {
      chai.request(server)
      .get('/api/posts')
      .end((err, res) => {
        // there should be no errors
        should.not.exist(err);
        // there should be a 200 status code
        res.status.should.equal(200);
        // the response should be JSON
        res.type.should.equal('application/json');
        // the JSON response body should have a
        // key-value pair of {"status": "success"}
        res.body.status.should.eql('success');
        done();
      });
    });
  });
