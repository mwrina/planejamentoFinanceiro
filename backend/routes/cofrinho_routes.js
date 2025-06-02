import express from 'express';
import { criarCofrinho, obterSaldoMes, atualizarCofrinho, excluirCofrinho } from '../controllers/cofrinho_controller.js';

const router = express.Router();

router.post('/', criarCofrinho);
router.get('/:usuario/:anoMes', obterSaldoMes);
router.put('/:id', atualizarCofrinho);
router.delete('/:id', excluirCofrinho);

export default router;
