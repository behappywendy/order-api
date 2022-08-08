const { expect } = require('chai');
const supertest = require('supertest');

const api = supertest('http://localhost:3001');
let APItoken;

orderData = [
  { productId: 34, amount: 1 },
  { productId: 37, amount: 2 },
];

before((done) => {
  api
    .post('/user/login')
    .set('Accept', 'application/json')
    .send({
      userName: 'dino',
      userPassword: '123',
    })
    .expect(200)
    .end((err, res) => {
      APItoken = res.body.token;
      done();
    });
});

describe('Order', () => {
  it('Create Order: should return order id', (done) => {
    api
      .post('/order')
      .set('Authorization', `Bearer ${APItoken}`)
      .send(orderData)
      .expect(200)
      .end((err, res) => {
        if (err) done(err);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('orderId');
        expect(res.body.orderId).to.be.a('string');
        done();
      });
  });

  it('Create Order Failed: should return no authorization', (done) => {
    api
      .post('/order')
      .send(orderData)
      .expect(401)
      .end((err, res) => {
        if (err) done(err);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('message', '尚未登入');
        expect(res.body.message).to.be.a('string');
        done();
      });
  });

  it('Create Order Failed: should return input data not array', (done) => {
    api
      .post('/order')
      .set('Authorization', `Bearer ${APItoken}`)
      .send(orderData[0])
      .expect(404)
      .end((err, res) => {
        if (err) done(err);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('message', '輸入的資料不是陣列');
        expect(res.body.message).to.be.a('string');
        done();
      });
  });

  it('Read Orders: should return order data classify by order id', (done) => {
    api
      .get('/order')
      .set('Authorization', `Bearer ${APItoken}`)
      .expect(200)
      .end((err, res) => {
        if (err) done(err);
        expect(res.body).to.be.an('array');
        expect(res.body[0]).to.be.an('object');
        expect(res.body[0]).to.have.property('orderId');
        expect(res.body[0].orderId).to.be.a('string');
        expect(res.body[0]).to.have.property('content');
        expect(res.body[0].content).to.be.an('array');
        expect(res.body[0].content[0]).to.be.an('object');
        expect(res.body[0].content[0]).to.have.property('productId');
        expect(res.body[0].content[0].productId).to.be.a('number');
        expect(res.body[0].content[0]).to.have.property('productName');
        expect(res.body[0].content[0].productName).to.be.a('string');
        expect(res.body[0].content[0]).to.have.property('productPrice');
        expect(res.body[0].content[0].productPrice).to.be.a('number');
        expect(res.body[0].content[0]).to.have.property('amount');
        expect(res.body[0].content[0].amount).to.be.a('number');
        expect(res.body[0].content[0]).to.have.property('createTime');
        expect(res.body[0].content[0].createTime).to.be.a('string');
        done();
      });
  });

  it('Read Orders Failed: should return no authorization', (done) => {
    api
      .get('/order')
      .expect(401)
      .end((err, res) => {
        if (err) done(err);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('message', '尚未登入');
        expect(res.body.message).to.be.a('string');
        done();
      });
  });
});
