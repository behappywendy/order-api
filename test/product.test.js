const { expect } = require('chai')
const supertest = require('supertest')

const api = supertest('http://localhost:3001')
let productCreated

const productData = {
  productName: 'product-name-test',
  productPrice: 87,
  productSales: 87,
  productStock: 87,
  note: 'note-test',
}

describe('Product', () => {
  it('Create Product: should return product data', (done) => {
    api
      .post('/product')
      .send(productData)
      .expect(200)
      .end((err, res) => {
        if (err) done(err)
        expect(res.body).to.have.property('productId')
        expect(res.body.productId).to.be.a('number')
        expect(res.body).to.have.property('productName')
        expect(res.body.productName).to.be.a('string')
        expect(res.body.productName).to.equal(productData.productName)
        expect(res.body).to.have.property('productPrice')
        expect(res.body.productPrice).to.be.a('number')
        expect(res.body.productPrice).to.equal(productData.productPrice)
        expect(res.body).to.have.property('productSales')
        expect(res.body.productSales).to.be.a('number')
        expect(res.body.productSales).to.equal(productData.productSales)
        expect(res.body).to.have.property('productStock')
        expect(res.body.productStock).to.be.a('number')
        expect(res.body.productStock).to.equal(productData.productStock)
        expect(res.body).to.have.property('note')
        expect(res.body.note).to.be.a('string')
        expect(res.body.note).to.equal(productData.note)
        productCreated = res.body.productId
        done()
      })
  })

  it('Create Product: should return product data', (done) => {
    api
      .post('/product')
      .send({
        productPrice: productData.productPrice,
        productSales: productData.productSales,
        productStock: productData.productStock,
        note: productData.note,
      })
      .expect(404)
      .end((err, res) => {
        if (err) done(err)
        expect(res.body).to.have.property('message')
        expect(res.body.message).to.be.a('string')
        expect(res.body.message).to.equal('未輸入商品名稱')
        done()
      })
  })

  it('Read Product: should get product name, price, sales, stock, and note', (done) => {
    api
      .get(`/product/${productCreated}`)
      .expect(200)
      .end((err, res) => {
        if (err) done(err)
        expect(res.body).to.have.property('productId')
        expect(res.body.productId).to.be.a('number')
        expect(res.body).to.have.property('createTime')
        expect(res.body.createTime).to.be.a('string')
        expect(res.body).to.have.property('updateTime')
        expect(res.body.updateTime).to.be.a('string')
        expect(res.body).to.have.property('productName')
        expect(res.body.productName).to.be.a('string')
        expect(res.body).to.have.property('productPrice')
        expect(res.body.productPrice).to.be.a('number')
        expect(res.body).to.have.property('productSales')
        expect(res.body.productSales).to.be.a('number')
        expect(res.body).to.have.property('productStock')
        expect(res.body.productStock).to.be.a('number')
        expect(res.body).to.have.property('note')
        expect(res.body.note).to.be.a('string')
        done()
      })
  })

  it('Read Product Failed: should return no product', (done) => {
    api
      .get('/product/2')
      .expect(500)
      .end((err, res) => {
        if (err) done(err)
        expect(res.body).to.have.property('message')
        expect(res.body.message).to.be.a('string')
        expect(res.body.message).to.equal('無此商品')
        done()
      })
  })

  it('Read Products: should get product name, price, sales, stock, and note', (done) => {
    api
      .get('/product')
      .expect(200)
      .end((err, res) => {
        if (err) done(err)
        expect(res.body[0]).to.have.property('productId')
        expect(res.body[0].productId).to.be.a('number')
        expect(res.body[0]).to.have.property('createTime')
        expect(res.body[0].createTime).to.be.a('string')
        expect(res.body[0]).to.have.property('updateTime')
        expect(res.body[0].updateTime).to.be.a('string')
        expect(res.body[0]).to.have.property('productName')
        expect(res.body[0].productName).to.be.a('string')
        expect(res.body[0]).to.have.property('productPrice')
        expect(res.body[0].productPrice).to.be.a('number')
        expect(res.body[0]).to.have.property('productSales')
        expect(res.body[0].productSales).to.be.a('number')
        expect(res.body[0]).to.have.property('productStock')
        expect(res.body[0].productStock).to.be.a('number')
        expect(res.body[0]).to.have.property('note')
        expect(res.body[0].note).to.be.a('string')
        done()
      })
  })

  it('Update Product: should return success message', (done) => {
    api
      .put(`/product/${productCreated}`)
      .send({
        productName: 'product-name-update',
      })
      .expect(200)
      .end((err, res) => {
        if (err) done(err)
        expect(res.body).to.have.property('success')
        expect(res.body.success).to.be.a('boolean')
        done()
      })
  })

  it('Update Product Failed: should return success message', (done) => {
    api
      .put('/product/2')
      .send({
        productName: 'product-name-update',
      })
      .expect(404)
      .end((err, res) => {
        if (err) done(err)
        expect(res.body).to.have.property('success')
        expect(res.body.success).to.be.a('boolean')
        done()
      })
  })

  it('Delete Product: should return success message', (done) => {
    api
      .delete(`/product/${productCreated}`)
      .expect(200)
      .end((err, res) => {
        if (err) done(err)
        expect(res.body).to.have.property('success')
        expect(res.body.success).to.be.a('boolean')
        done()
      })
  })

  it('Delete Product Failed: should return success message', (done) => {
    api
      .delete('/product/2')
      .expect(404)
      .end((err, res) => {
        if (err) done(err)
        expect(res.body).to.have.property('success')
        expect(res.body.success).to.be.a('boolean')
        done()
      })
  })
})
