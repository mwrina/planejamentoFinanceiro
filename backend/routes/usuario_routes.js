import express from 'express';
import { criarUsuario, loginUsuario } from '../controllers/usuario_controller.js';

const router = express.Router();

router.post('/criar', criarUsuario);
router.post('/login', loginUsuario);

export default router;