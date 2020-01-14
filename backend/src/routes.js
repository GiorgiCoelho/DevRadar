const { Router } = require('express');
const DevController = require('./controllers/DevController');
const SearchController = require('./controllers/SearchController');

const routes = Router();

//Métodos HTTP: GET, POST, PUT, DELETE

//Tipos de parâmetros
//Query Params: req.query (filtros, ordenação, paginação, ...)
//Route Params: req.params (Identificar um recurso na alteração ou remoção)
//Body: req.body (Dados para criação ou alteração de um registro)
routes.get('/devs', DevController.index);
routes.post('/devs', DevController.store);
routes.delete('/devs/:id', DevController.destroy);
routes.put('/devs/:id', DevController.update);

routes.get('/search', SearchController.index)

module.exports = routes;