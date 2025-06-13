import express from 'express';
import { atualizarUsuario, buscarUsuario, criarUsuario, loginUsuario } from '../controllers/usuario_controller.js';

const router = express.Router();

router.post('/criar', criarUsuario);
router.post('/login', loginUsuario);
router.put('/editar/:id', atualizarUsuario);
router.get('/:id', buscarUsuario);

export default router;