// test/index.test.js

const request = require('supertest');
const app = require('../index');

describe('Authentication App', () => {
  it('should render registration page', async () => {
    const res = await request(app).get('/register');
    expect(res.statusCode).toEqual(200);
    expect(res.text).toContain('Register');
  });

  it('should handle user registration', async () => {
    const res = await request(app)
      .post('/register')
      .send({ username: 'testuser', password: 'testpassword' });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('message', 'User registered successfully');
  });

  it('should render login page', async () => {
    const res = await request(app).get('/login');
    expect(res.statusCode).toEqual(200);
    expect(res.text).toContain('Login');
  });

  it('should handle user login', async () => {
    const res = await request(app)
      .post('/login')
      .send({ username: 'testuser', password: 'testpassword' });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('token');
  });

  it('should handle invalid login credentials', async () => {
    const res = await request(app)
      .post('/login')
      .send({ username: 'nonexistentuser', password: 'invalidpassword' });

    expect(res.statusCode).toEqual(401);
    expect(res.body).toHaveProperty('error', 'Invalid username or password');
  });
});
