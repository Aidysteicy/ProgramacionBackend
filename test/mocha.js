const { expect } = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

const url = 'http://localhost:8080';
describe('POST prods ', () => {
  const prod = {
    nombre: 'nuevo titulo',
    descripticon: 'producto de prueba desde mocha',
    precio: 88,
    foto: 'https://----',
    stock: 99,
  };
  it('should return 200', (done) => {
    chai
      .request(url)
      .post('/prods')
      .send(prod)
      .end(function (err, res) {
        expect(res).to.have.status(200);
        done();
      });
  });
  it('should return an object', (done) => {
    chai
      .request(url)
      .post('/prods')
      .send(prod)
      .end((err, res) => {
        expect(res.body)
          .to.be.an.instanceOf(Object)
          .that.includes.all.keys({
            prod: ['nombre', 'descripcion', 'precio', 'foto', 'stock'],
          });
        done();
      });
  });
});

describe('GET prods', () => {
  it('should return 200', (done) => {
    chai
      .request(url)
      .get('/prods')
      .end((err, res) => {
        if (err) return done(err);
        expect(res).to.have.status(200);
        expect(res.body).to.be.instanceOf(Object);
        done();
      });
  });
  it('should return 200', () => {
    let id = '9ad3oa7';
    chai
      .request(url)
      .get(`/prods/${id}`)
      .end((err, res) => {
        if (err) return done(err);
        expect(res).to.have.status(200);
        expect(res.body).to.be.instanceOf(Object);
      });
  });
});

describe('PUT prods', () => {
  it('should return 200', (done) => {
    let id = 'o98sdy';
    let data = { nombre: 'nuevo title' };
    chai
      .request(url)
      .put(`/prods/${id}`)
      .send(data)
      .end((err, res) => {
        if (err) return done(err);
        expect(res).to.have.status(200);
        expect(res.body).to.be.instanceOf(Object);
        done();
      });
  });
});

describe('DELETE prod(s)', () => {
  it('should return 200 deleteOne', (done) => {
    let id = '78asui';
    chai
      .request(url)
      .delete(`/prods/${id}`)
      .end((err, res) => {
        if (err) return done(err);
        expect(res).to.have.status(200);
        done();
      });
  });
  it('should return 200 deleteAll', (done) => {
    chai
      .request(url)
      .delete('/prods')
      .end((err, res) => {
        if (err) return done(err);
        expect(res).to.have.status(200);
        done();
      });
  });
});