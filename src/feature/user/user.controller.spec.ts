import * as request from 'supertest';

const app = 'http://localhost:4000'
describe('User', () => {

  it(`get user list`, () => {
    return request(app)
      .get('/users')
      .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc0FkbWluIjp0cnVlLCJ1c2VySWQiOjIsInVzZXJuYW1lIjoiYWRtaW4iLCJyb2xlcyI6WzFdLCJpYXQiOjE2MDQ1MTU1OTUsImV4cCI6MTYwNTEyMDM5NX0.2w2GmjTRjHLTzrDo6oL-w-kuqrR9vQ7IplkldQxNj5I')
      .expect(200)
      .expect(({body}) => {
        expect(body).toBeDefined()
      })
  });

  it(`get user detail`, () => {
    return request(app)
      .get('/users/6')
      .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc0FkbWluIjp0cnVlLCJ1c2VySWQiOjIsInVzZXJuYW1lIjoiYWRtaW4iLCJyb2xlcyI6WzFdLCJpYXQiOjE2MDQ1MTU1OTUsImV4cCI6MTYwNTEyMDM5NX0.2w2GmjTRjHLTzrDo6oL-w-kuqrR9vQ7IplkldQxNj5I')
      .expect(200)
  });

  it(`update `, () => {
    return request(app)
      .put('/users/6')
      .send({
        username: 'asdasd'
      })
      .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc0FkbWluIjp0cnVlLCJ1c2VySWQiOjIsInVzZXJuYW1lIjoiYWRtaW4iLCJyb2xlcyI6WzFdLCJpYXQiOjE2MDQ1MTU1OTUsImV4cCI6MTYwNTEyMDM5NX0.2w2GmjTRjHLTzrDo6oL-w-kuqrR9vQ7IplkldQxNj5I')
      .expect(200)
  });

});
