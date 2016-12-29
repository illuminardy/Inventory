const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const should = chai.should();
const Stock = require('../lib/models/stock');

chai.use(chaiHttp);

describe('Stock', () => {
  beforeEach((done) => { //Before each test we empty the database
    Stock.remove({}, (err) => {
       done();
    });
  });

  // GET -------------------------------
  describe('/GET stock', () => {
    it('it should GET all the inventory', (done) => {
      chai.request(server)
        .get('/stock')
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('array');
            res.body.length.should.be.eql(0);
          done();
        });
    });
    it('it should GET a single stock item', (done) => {
      const newStockItem = new Stock({
        name: 'Otto',
        description: 'Yummy',
        price: 1,
        dateAvailable: 'today',
        taxable: true
      });

      newStockItem.save(function(err) {
        should.not.exist(err);
        const path = "/stock/" + newStockItem._id;
        chai.request(server)
          .get(path)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.have.property('_id');
            res.body.should.have.property('name');
            res.body.name.should.equal('Otto');
            done();
          });
      });
    });
  });

  // POST -------------------------------
  describe('/POST stock item', () => {
    it('it should POST a new stock item', (done) => {
      const newStockItem = new Stock({
        name: 'Otto',
        description: 'Yummy',
        price: 1,
        dateAvailable: 'today',
        taxable: true
      });
      chai.request(server)
        .post('/stock')
        .send(newStockItem)
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('message').eql('stock item created!');
          done();
        });
    });
  });

  // PUT -------------------------------
  describe('/PUT bear', () => {
    it('it should update a bear via PUT', (done) => {
      const newStockItem = new Stock({
        name: 'Yanardy',
        description: 'Yummy',
        price: 1,
        dateAvailable: 'today',
        taxable: true
      });
      const updatedStockItem = {
        name: 'Otto',
        description: 'Yummy',
        price: 1,
        dateAvailable: "today",
        taxable: true
      };
      newStockItem.save(function(err) {
        should.not.exist(err);
        const path = "/stock/" + newStockItem._id;
        chai.request(server)
          .put(path)
          .send(updatedStockItem)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.have.property('message').eql('stock item updated!');
            done();
          });
      });
    });
  });

  // DELETE -------------------------------
  describe('/DELETE stock item', () => {
    it('it should DELETE a stock item', (done) => {
      const newStockItem = new Stock({
        name: 'Yanardy',
        description: 'Yummy',
        price: 1,
        dateAvailable: 'today',
        taxable: true
      });
      newStockItem.save(function(err) {
        should.not.exist(err);
        const path = "/stock/" + newStockItem._id;
        chai.request(server)
          .delete(path)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.have.property('message').eql('stock item deleted!');
            done();
          });
      });
  });
  });
})
