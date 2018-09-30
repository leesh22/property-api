import { Router } from 'express';
import { getProperties } from './propertiesService.js';
const routes = Router();

routes.get('/', (req, res) => {
  res.render('index', { title: 'Express Babel' });
});


routes.get('/properties', (req, res) => {
  getProperties().then((properties) => {
    res.json(properties);
  })
});

export default routes;
