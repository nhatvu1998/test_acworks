import * as request from 'supertest';

const app = 'http://localhost:4000'
describe('Criteria', () => {
  for(let i = 0; i <= 10; i++) {
    it(`test add criteria`, () => {
      return request(app)
        .post('/criterias')
        .send({
          name: `criteria ${i}`,
          point: Math.floor(Math.random() * 10) + 1,
          type: Math.floor(Math.random() * 2)
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(201)
    });
  }

  it(`get criteria list`, () => {
    return request(app)
      .get('/criterias')
      .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc0FkbWluIjp0cnVlLCJ1c2VySWQiOjIsInVzZXJuYW1lIjoiYWRtaW4iLCJyb2xlcyI6WzFdLCJpYXQiOjE2MDQ1MTU1OTUsImV4cCI6MTYwNTEyMDM5NX0.2w2GmjTRjHLTzrDo6oL-w-kuqrR9vQ7IplkldQxNj5I')
      .expect(200)
      .expect(({body}) => {
        expect(body).toBeDefined()
      })
  });

});
