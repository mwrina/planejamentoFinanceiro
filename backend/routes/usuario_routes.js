import express from 'express';
import { criarUsuario } from '../controllers/usuario_controller.js';

const router = express.Router();

router.post('/usuarios', criarUsuario);
router.post('/login', loginUsuario);

export default router;