import express from 'express';
import { criarCofrinho, obterSaldoMes, atualizarCofrinho, excluirCofrinho, obterHistoricoAnual } from '../controllers/cofrinho_controller.js';

const router = express.Router();

router.post('/', criarCofrinho);
router.get('/:usuario/:data', obterSaldoMes);
router.put('/:id', atualizarCofrinho);
router.delete('/:id', excluirCofrinho);
router.get('/historico/:usuario', obterHistoricoAnual);

export default router;
