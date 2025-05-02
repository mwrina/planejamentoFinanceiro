import express from 'express';
import usuarioRoutes from './routes/usuario_routes.js';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/usuarios', usuarioRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
