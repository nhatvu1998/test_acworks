import * as request from 'supertest';

const app = 'http://localhost:4000'
describe('Auth', () => {

  it(`test login`, () => {
    return request(app)
      .post('/auth/login')
      .send({
        username: 'vu',
        password: '123',
      })
      .expect(200)
      .expect(({body}) => {
        expect(body.token).toBeDefined()
      })
  });

    it(`test register`, () => {
      return request(app)
        .post('/auth/register')
        .send({
          username: `${Math.random().toString(36).substring(5)}`,
          password: '123',
          fullname: `${Math.random().toString(36).substring(8)}`,
          email: `${Math.random().toString(36).substring(4)}@gmail.com`,
          age: Math.floor(Math.random() * 50) + 1,
          gender: Math.floor(Math.random() * 2)
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(201)
    });

});
