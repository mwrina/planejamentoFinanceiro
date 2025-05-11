import express from 'express';
import usuarioRoutes from './routes/usuario_routes.js';
import entradasRoutes from './routes/entradas_routes.js';

import cors from 'cors';

const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const entradasRoutes = require('./routes/entradas.routes');

app.use(cors());
app.use(express.json());

app.use('/api/usuarios', usuarioRoutes);
app.use('/api/entradas', entradasRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
