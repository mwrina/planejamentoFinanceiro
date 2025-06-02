import express from 'express';
import usuarioRoutes from './routes/usuario_routes.js';
import entradasRoutes from './routes/entradas_routes.js';
import saidasRoutes from './routes/saidas_routes.js';
import investimentosRoutes from './routes/investimentos_routes.js'
import cofrinhoRoutes from './routes/cofrinho_routes.js'

import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/usuarios', usuarioRoutes);
app.use('/api/entradas', entradasRoutes);
app.use('/api/saidas', saidasRoutes);
app.use('/api/investimentos', investimentosRoutes);
app.use('/api/cofrinho', cofrinhoRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
