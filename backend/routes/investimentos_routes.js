import express from 'express';
import { 
  criarInvestimento,
  listarInvestimentos,
  atualizarInvestimento,
  deletarInvestimento
} from '../controllers/investimento_controller.js';

const router = express.Router();

router.post('/', criarInvestimento);
router.get('/:usuario', listarInvestimentos);
router.put('/:id', atualizarInvestimento);
router.delete('/:id', deletarInvestimento);

export default router;