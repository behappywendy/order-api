const { expect } = require('chai')
const supertest = require('supertest')

const api = supertest('http://localhost:3001')
let APItoken
let cartCreated

const cartData = {
  productId: 40,
  amount: 1,
  totalPrice: 10,
}

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
      APItoken = res.body.token
      done()
    })
})

describe('Cart', () => {
  it('Create Cart: should return cart data', (done) => {
    api
      .post('/cart')
      .set('Authorization', `Bearer ${APItoken}`)
      .send(cartData)
      .expect(200)
      .end((err, res) => {
        if (err) done(err)
        expect(res.body).to.be.an('object')
        expect(res.body).to.have.property('userId')
        expect(res.body.userId).to.be.a('number')
        expect(res.body).to.have.property('productId', cartData.productId)
        expect(res.body.productId).to.be.a('number')
        expect(res.body).to.have.property('amount', cartData.amount)
        expect(res.body.amount).to.be.a('number')
        expect(res.body).to.have.property('totalPrice', cartData.totalPrice)
        expect(res.body.totalPrice).to.be.a('number')
        cartCreated = cartData.productId
        done()
      })
  })

  it('Create Cart Failed: should retrun no product', (done) => {
    api
      .post('/cart')
      .set('Authorization', `Bearer ${APItoken}`)
      .send({
        ...cartData,
        productId: 2,
      })
      .expect(404)
      .end((err, res) => {
        if (err) done(err)
        expect(res.body).to.be.an('object')
        expect(res.body).to.have.property('message', '無此商品')
        expect(res.body.message).to.be.a('string')
        done()
      })
  })

  it('Create Cart Failed: should return no authorization', (done) => {
    api
      .post('/cart')
      .send(cartData)
      .expect(401)
      .end((err, res) => {
        if (err) done(err)
        expect(res.body).to.be.an('object')
        expect(res.body).to.have.property('message', '尚未登入')
        expect(res.body.message).to.be.a('string')
        done()
      })
  })

  it('Read Carts: should return an array with user cart which includes product id, name, price, amount, total price', (done) => {
    api
      .get('/cart')
      .set('Authorization', `Bearer ${APItoken}`)
      .expect(200)
      .end((err, res) => {
        if (err) done(err)
        expect(res.body).to.be.an('array')
        expect(res.body[0]).to.be.an('object')
        expect(res.body[0]).to.have.property('productId')
        expect(res.body[0].productId).to.be.a('number')
        expect(res.body[0]).to.have.property('productName')
        expect(res.body[0].productName).to.be.a('string')
        expect(res.body[0]).to.have.property('productPrice')
        expect(res.body[0].productPrice).to.be.a('number')
        expect(res.body[0]).to.have.property('amount')
        expect(res.body[0].amount).to.be.a('number')
        expect(res.body[0]).to.have.property('totalPrice')
        expect(res.body[0].totalPrice).to.be.a('number')
        done()
      })
  })

  it('Read Cart Failed: should return no authorization', (done) => {
    api
      .get('/cart')
      .expect(401)
      .end((err, res) => {
        if (err) done(err)
        expect(res.body).to.be.an('object')
        expect(res.body).to.have.property('message', '尚未登入')
        expect(res.body.message).to.be.a('string')
        done()
      })
  })

  it('Update Cart: should return success true message', (done) => {
    api
      .put(`/cart/${cartCreated}`)
      .set('Authorization', `Bearer ${APItoken}`)
      .send({
        amount: 2,
        totalPrice: 88,
      })
      .expect(200)
      .end((err, res) => {
        if (err) done(err)
        expect(res.body).to.be.an('object')
        expect(res.body).to.have.property('success')
        expect(res.body.success).to.be.a('boolean')
        expect(res.body.success).to.be.true
        done()
      })
  })

  it('Update Cart Failed: should return success false message', (done) => {
    api
      .put('/cart/2')
      .set('Authorization', `Bearer ${APItoken}`)
      .send({
        amount: 2,
        totalPrice: 88,
      })
      .expect(404)
      .end((err, res) => {
        if (err) done(err)
        expect(res.body).to.be.an('object')
        expect(res.body).to.have.property('success')
        expect(res.body.success).to.be.a('boolean')
        expect(res.body.success).to.be.false
        done()
      })
  })

  it('Update Cart Failed: should return no authorization', (done) => {
    api
      .put(`/cart/${cartCreated}`)
      .send({
        amount: 2,
        totalPrice: 88,
      })
      .expect(401)
      .end((err, res) => {
        if (err) done(err)
        expect(res.body).to.be.an('object')
        expect(res.body).to.have.property('message', '尚未登入')
        expect(res.body.message).to.be.a('string')
        done()
      })
  })

  it('Delete Cart: should return success true message', (done) => {
    api
      .delete(`/cart/${cartCreated}`)
      .set('Authorization', `Bearer ${APItoken}`)
      .expect(200)
      .end((err, res) => {
        if (err) done(err)
        expect(res.body).to.be.an('object')
        expect(res.body).to.have.property('success')
        expect(res.body.success).to.be.a('boolean')
        expect(res.body.success).to.be.true
        done()
      })
  })

  it('Delete Cart Failed: should return success false message', (done) => {
    api
      .delete('/cart/2')
      .set('Authorization', `Bearer ${APItoken}`)
      .expect(404)
      .end((err, res) => {
        if (err) done(err)
        expect(res.body).to.be.an('object')
        expect(res.body).to.have.property('success')
        expect(res.body.success).to.be.a('boolean')
        expect(res.body.success).to.be.false
        done()
      })
  })

  it('Delete Cart Failed: should return no authorization', (done) => {
    api
      .delete(`/cart/${cartCreated}`)
      .expect(401)
      .end((err, res) => {
        if (err) done(err)
        expect(res.body).to.be.an('object')
        expect(res.body).to.have.property('message', '尚未登入')
        expect(res.body.message).to.be.a('string')
        done()
      })
  })
})
