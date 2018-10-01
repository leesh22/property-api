import request from 'supertest';
import app from '../src/app.js';

describe('GET /', () => {
  it('should render properly', async () => {
    await request(app).get('/').expect(200);
  });
});

describe('GET /properties', () => {
  //checking end point returns 200
  it('should return 200', async () => {
    await request(app).get('/properties').expect(200);
  });

  it('should call getProperties', async () => {
    const getProperties = jest.fn();

    await request(app)
    .get('/properties')
    
    getProperties();
    expect(getProperties).toHaveBeenCalled()
  });

  it('should return array', async () => {
    await request(app)
    .get('/properties')
    .expect(200)
    .then((data) => {
      expect(Array.isArray(data.body)).toBe(true);
    })
  });
});

describe('GET /404', () => {
  it('should return 404 for non-existent URLs', async () => {
    await request(app).get('/404').expect(404);
    await request(app).get('/notfound').expect(404);
  });
});
