// Minha primeira API

const express = require('express');

const server = express();

server.use(express.json());

  // Query params = localhost:3000/teste -> ?nome=Ederson
  // Route params = localhost:3000 -> /teste/1
  // Request params = localhost:3000 -> { "name": "Ederson", "email": "eder.gcs@gmail.com" }

  // CRUD - Create, Read, Update, Delete

// Vetor com nomes
const teste = [ 'Ederson', 'Franciane', 'Paçoca' ];

// Middleware Global
server.use((req, res, next) => {
  console.log(`Método: ${req.method}; URL: ${req.url}`);

  return next();
})

// Middleware Local
function checkUserExists (req, res, next) {
  if (!req.body.name) {
    return res.status(400).json({ error: 'User name is required' });
  }

  return next();
}

// Middleware Local - Verifica se o index informado existe
function checkUserInArray(req, res, next) {
  if (!teste[req.params.index]) {
    return res.status(400).json({ error: 'User does not exists' });
  }


  return next();
}

// Create new name in vetor
server.post('/teste', checkUserExists, (req, res) => {
  const { name } = req.body;

  teste.push(name);

  return res.json(teste);
});

// Read for Request params - Lista o nome do vetor de acordo com o index informado
server.get('/teste/:index', checkUserInArray, (req, res) => {
  const { index } = req.params;
  
  return res.json(teste[index]);
})

// Read for Request params - Lista todo o vetor
server.get('/teste', (req, res) => {
  const { index } = req.params;
  
  return res.json(teste);
})

// Update name in vetor - Atualiza o vetor de acordo com o index informado
server.put('/teste/:index', checkUserExists, checkUserInArray, (req, res) => {
  const { index } = req.params;
  const { name } = req.body;

  teste[index] = name;

  return res.json(teste);
});

// Delete name in vetor - Apaga o nome no vetor de acordo com o index informado
server.delete('/teste/:index', checkUserInArray, (req, res) => {
  const { index } = req.params;

  teste.splice(index, 1);

  return res.json(teste);
});

server.listen(3000);
