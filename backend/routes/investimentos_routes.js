import express from 'express';
import { 
  criarInvestimento,
  listarInvestimentos,
  atualizarInvestimento,
  deletarInvestimento,
  calcTotal,
  calcTotalMes
} from '../controllers/investimento_controller.js';

const router = express.Router();

router.post('/', criarInvestimento);
router.get('/:usuario', listarInvestimentos);
router.get('/total/:usuario', calcTotal);
router.get('/total/:usuario/:mes', calcTotalMes);
router.put('/:id', atualizarInvestimento);
router.delete('/:id', deletarInvestimento);

export default router;