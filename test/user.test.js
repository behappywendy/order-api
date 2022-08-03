const { expect } = require('chai')
const supertest = require('supertest')

const api = supertest('http://localhost:3001')
let APItoken
let userCreated

// before((done) => {
//   api
//     .post('/user/login')
//     .set('Accept', 'application/json')
//     .send({
//       userName: 'dino',
//       userPassword: '123',
//     })
//     .expect(200)
//     .end((err, res) => {
//       APItoken = res.body.token
//       done()
//     })
// })

describe('User', () => {
  it('Login: should return admin permission and user token after login', (done) => {
    api
      .post('/user/login')
      .send({
        userName: 'dino',
        userPassword: '123',
      })
      .expect(200)
      .end((err, res) => {
        if (err) done(err)
        expect(res.body).to.have.property('adminPermission')
        expect(res.body.adminPermission).to.be.a('number')
        expect(res.body).to.have.property('token')
        expect(res.body.token).to.be.a('string')
        done()
      })
  })

  it('Login Failed: should return username or password is wrong', (done) => {
    api
      .post('/user/login')
      .send({
        userName: 'wrong-username',
        userPassword: 'wrong-password',
      })
      .expect(401)
      .end((err, res) => {
        if (err) done(err)
        expect(res.body).to.have.property('message')
        expect(res.body.message).to.be.a('string')
        expect(res.body.message).to.equal('使用者名稱或密碼錯誤')
        done()
      })
  })

  it('Create User: should return userId', (done) => {
    api
      .post('/user')
      .set('Accept', 'application/json')
      .send({
        userName: 'name-test',
        userPassword: 'password-test',
        adminPermission: 1,
      })
      .expect(200)
      .end((err, res) => {
        if (err) done(err)
        expect(res.body[0]).to.be.a('number')
        userCreated = res.body[0]
        done()
      })
  })

  it('Create User Failed: should return userId has been used', (done) => {
    api
      .post('/user')
      .set('Accept', 'application/json')
      .send({
        userName: 'dino',
        userPassword: 'password-test',
        adminPermission: 1,
      })
      .expect(401)
      .end((err, res) => {
        if (err) done(err)
        expect(res.body).to.have.property('message')
        expect(res.body.message).to.be.a('string')
        expect(res.body.message).to.equal('使用者名稱已存在')
        done()
      })
  })

  it('Read Users: should get all the users by username, password, and admin permission', (done) => {
    api
      .get('/user')
      .expect(200)
      .end((err, res) => {
        if (err) done(err)
        expect(res.body[0]).to.have.property('userId')
        expect(res.body[0].userId).to.be.a('number')
        expect(res.body[0]).to.have.property('userName')
        expect(res.body[0].userName).to.be.a('string')
        expect(res.body[0]).to.have.property('userPassword')
        expect(res.body[0].userPassword).to.be.a('string')
        expect(res.body[0]).to.have.property('adminPermission')
        expect(res.body[0].adminPermission).to.be.a('number')
        done()
      })
  })

  it('Read User: should get all the users by username, password, and admin permission', (done) => {
    api
      .get(`/user/${userCreated}`)
      .expect(200)
      .end((err, res) => {
        if (err) done(err)
        expect(res.body[0]).to.have.property('userId')
        expect(res.body[0].userId).to.be.a('number')
        expect(res.body[0]).to.have.property('userName')
        expect(res.body[0].userName).to.be.a('string')
        expect(res.body[0]).to.have.property('userPassword')
        expect(res.body[0].userPassword).to.be.a('string')
        expect(res.body[0]).to.have.property('adminPermission')
        expect(res.body[0].adminPermission).to.be.a('number')
        done()
      })
  })

  it('Update User: should return success message', (done) => {
    api
      .put(`/user/${userCreated}`)
      .set('Accept', 'application/json')
      .send({
        userName: 'name-test-update',
        userPassword: 'password-test-update',
        adminPermission: 0,
      })
      .expect(200)
      .end((err, res) => {
        if (err) done(err)
        expect(res.body).to.have.property('success')
        expect(res.body.success).to.be.a('boolean')
        done()
      })
  })

  it('Delete User: should return success message', (done) => {
    api
      .delete(`/user/${userCreated}`)
      .expect(200)
      .end((err, res) => {
        if (err) done(err)
        expect(res.body).to.have.property('success')
        expect(res.body.success).to.be.a('boolean')
        done()
      })
  })
})
